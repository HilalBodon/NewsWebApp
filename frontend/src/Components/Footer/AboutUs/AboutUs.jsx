import React, { useEffect } from 'react';
import './aboutUs.css'; 
const AboutUs = ({ onClose }) => {
  useEffect(() => {
    const aboutUsOverlay = document.querySelector('.about-us-overlay');
    aboutUsOverlay.scrollTop = 0;
  }, []);

  return (
    <div className="about-us-overlay" onClick={onClose}>
      <div className="about-us-content" onClick={(e) => e.stopPropagation()}>
        <div className="about-us-container">
          <h2 className='about-us-title'>About Us</h2>
          <p className='about-us-text'>
<b>الرؤية 
 نحو مجتمعٍ واعٍ ومثقف
القيم ,الإيمان بالفكرة . 
من نحن؟</b>
نحن مجموعة شباب وصبايا من الكتّاب والمبدعين والمثقفين في مخيم نهر البارد، نسعى إلى إنشاء بيئة حاضنة عبر مركزنا " مركز زاوية رؤية الثقافي " لمواهبنا وفكرتنا الثقافية التي نؤمن بها، وذلك لعدم وجود مساحة ومركز خاص للمبدعين والمثقفين في المخيم، يحتضن إبداعاتهم، ويشكل مساحة لهم للتلاقي وإقامة النشاطات الثقافية العامة، وإقامة الدورات التثقيفية والفنية على أنواعها وجلسات نقاش وحوار بينهم، بالإضافة إلى مشاركة الكتّاب اللبنانيين في الجوار اللبناني من خلال مشاركتهم في البيئة الثقافية الفلسطينية، ونسعى إلى تطوير هذه المساحة كي تشكل مرجع ثقافي وبيئة ثقافية حاضنة.
One of our project goals is to cultivate young people's talents and their skills in addition to children, and those who have special needs and could not express their ideas. We aim to prepare a conscious, cultured and creative generation who is able to face ignorance and present the camp in the most beautiful image. 
للتواصل على الرقم التالي: +96179152436      </p>
          <button className='about-us-close-button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;





{/* <div>
<button className="close-button" onClick={onClose}>
Close
</button>
<h2>About Us</h2>
<p>
الرؤية: نحو مجتمعٍ واعٍ ومثقف
القيم: الإيمان بالفكرة 
من نحن؟
نحن مجموعة شباب وصبايا من الكتّاب والمبدعين والمثقفين في مخيم نهر البارد، نسعى إلى إنشاء بيئة حاضنة عبر مركزنا " مركز زاوية رؤية الثقافي " لمواهبنا وفكرتنا الثقافية التي نؤمن بها، وذلك لعدم وجود مساحة ومركز خاص للمبدعين والمثقفين في المخيم، يحتضن إبداعاتهم، ويشكل مساحة لهم للتلاقي وإقامة النشاطات الثقافية العامة، وإقامة الدورات التثقيفية والفنية على أنواعها وجلسات نقاش وحوار بينهم، بالإضافة إلى مشاركة الكتّاب اللبنانيين في الجوار اللبناني من خلال مشاركتهم في البيئة الثقافية الفلسطينية، ونسعى إلى تطوير هذه المساحة كي تشكل مرجع ثقافي وبيئة ثقافية حاضنة.
One of our project goals is to cultivate young people's talents and their skills in addition to children, and those who have special needs and could not express their ideas. We aim to prepare a conscious, cultured and creative generation who is able to face ignorance and present the camp in the most beautiful image. 


للتواصل على الرقم التالي: 0096179152436      </p>
</div> */}