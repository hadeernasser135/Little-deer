/*
  book-guard.js
  ---------------------------------------------------------
  إزاي تستخدميه (لما تبقي جاهزة تقفلي الكتاب):

  1) حطي فولدر الكتاب النهائي جنب باقي الملفات دي، وسميه "book"
     (يعني index.html بتاع الكتاب يبقى في: book/index.html)

  2) افتحي ملف index.html بتاع الكتاب، وضيفي السطور دي جوه <head>
     قبل أي كود تاني، بالترتيب ده بالظبط:

     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
     <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
     <script src="../firebase-config.js"></script>
     <script src="../book-guard.js"></script>

  3) خلاص، الكتاب دلوقتي مقفول على أي حد مش مسجل دخول
     وعنده اشتراك "active" ومش خلصان.
  ---------------------------------------------------------
*/

(function(){
  // نخبي محتوى الصفحة لحد ما نتأكد من صلاحية الدخول
  document.documentElement.style.visibility = 'hidden';

  function blockAccess(reason){
    document.documentElement.innerHTML = `
      <div style="
        font-family:Cairo,sans-serif;
        direction:rtl;
        min-height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#FFF6FA;
        text-align:center;
        padding:24px;
      ">
        <div>
          <div style="font-size:40px;margin-bottom:10px;">🦌🔒</div>
          <h2 style="color:#EC2F7C;margin:0 0 10px;">${reason}</h2>
          <p style="color:#665f77;margin:0 0 20px;">لازم تسجّلي دخول باشتراك شغال عشان تفتحي الكتاب.</p>
          <a href="../login.html" style="
            display:inline-block;
            background:#EC2F7C;
            color:#fff;
            padding:12px 26px;
            border-radius:14px;
            text-decoration:none;
            font-weight:700;
          ">تسجيل الدخول</a>
        </div>
      </div>
    `;
    document.documentElement.style.visibility = 'visible';
  }

  auth.onAuthStateChanged(async (user) => {
    if(!user){
      blockAccess('محتاجة تسجّلي دخول الأول');
      return;
    }
    try{
      const doc = await db.collection('users').doc(user.uid).get();
      if(!doc.exists){
        blockAccess('حسابك مش موجود');
        return;
      }
      const data = doc.data();
      const now = new Date();
      const isActive = data.status === 'active' && data.expiresAt && data.expiresAt.toDate() > now;

      if(isActive){
        document.documentElement.style.visibility = 'visible';
      } else if(data.status === 'pending'){
        blockAccess('حسابك لسه قيد المراجعة');
      } else {
        blockAccess('اشتراكك انتهى أو مش مفعّل');
      }
    }catch(err){
      blockAccess('حصل خطأ، حاولي تاني');
    }
  });
})();
