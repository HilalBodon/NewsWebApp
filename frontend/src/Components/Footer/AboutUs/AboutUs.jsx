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
          <h2 className='about-us-title'>من نحن؟</h2>
          <p className='about-us-text'>

نحن مجموعة شباب وصبايا من الكتّاب والمبدعين والمثقفين في مخيم نهر البارد، سنة 7/1/2020 ، قمنا بتأسيس بيئة ثقافية توعوية حاضنة عبر مركزنا " مركز زاوية رؤية الثقافي " لمواهبنا وفكرتنا الثقافية التي نؤمن بها، وذلك لعدم وجود مساحة ومركز خاص للمبدعين والمثقفين في المخيم، يحتضن إبداعاتهم، ويشكل مساحة لهم للتلاقي وإقامة النشاطات الثقافية العامة، وإقامة الدورات التثقيفية والفنية على أنواعها وجلسات نقاش وحوار بينهم، بالإضافة إلى مشاركة الكتّاب اللبنانيين في الجوار اللبناني من خلال مشاركتهم في البيئة الثقافية الفلسطينية، ونسعى إلى تطوير هذه المساحة كي تشكل مرجع ثقافي وبيئة ثقافية حاضنة
</p>

<br />

<p className='text-left'>
We are a group of young men and young women who are writers and creative people in Nahrelbared camp who aims to create a cultural environment in the camp, through our center, Roaya corner cultural center to develop our talents. We also aim to work on our idea that we believe in, because there is no cultural space in the camp for the talented artists and writers to meet and make cultural activities and discuss several subjects, in addition to sharing of Lebanese writers and artists in the camp. We also aim for developing this area, to be a very important cultural reference and a collective center in the camp.
<br /><br />
</p>

<p className='about-us-text'>
<b><u>: الأهداف</u></b>
<br /><br />

تعزيز دور المطالعة والقراءة في المجتمع من أجل جيلٍ واعٍ ومثقف. 
  تعزيز دور التوعية الثقافية والاجتماعية من أجل مجتمعٍ خالٍ من الآفّات. 
  العمل على إقامة محاضرات ودورات وورش بشكلٍ دوري لصقل المواهب الفنية والابداعية، بالإضافة إلى جلسات دعم نفسي كعلاج بالفن. 
  العمل على إصدار مجلة رؤية الشهرية توثيقية تحتوي على كتابات وإبداعات الشباب في المخيمات .
  تعزيز العمل التطوعي الثقافي الميداني 
  <br /><br />
  </p>
  <p className='text-left'>

To establish a public library in the center, which will become a cultural reference in the camp, which welcome cultural activities in the camp. To make art courses to teach art for talented children. To give cultural lectures and art therapy courses. To held cultural competitions like poetry performance and book discussions like making interviews and meetings with Lebanese writers. To open space for supporting school lessons for students. To go outside to streets and make live activities like drawing on the walls of the camp and meetings with people. The Media group of the center will shed light on rare creative cases in camp. Roaya cultural magazine.

</p>
<br /><br />
<p className='about-us-text'>
<b><u>: الرسالة</u></b>
</p>
<br />

<p className='about-us-text'>
نسعى من خلال مشروعنا إلى الاهتمام بصقل المواهب الإبداعية بين الشباب والصبايا، بالإضافة إلى الأطفال، ومن لديهم إعاقة نفسية وعدم القدرة على التعبير والنتاج الإبداعي المتجدد
</p>
<br />

<p className='text-left'>
One of our project goals is to cultivate young people’s talents and their skills in addition to children, and those who have special needs and could not express their ideas. We aim to prepare a conscious, cultured and creative generation who is able to face ignorance and present the camp in the most beautiful image. This will help them to defend their issue, through art, culture, writing and creativity.
</p>
<br /><br />


<p className='about-us-text'>
<a href='https://docs.google.com/forms/d/e/1FAIpQLScgaIfumNdgQG3CnxEokEq10j6ufCs-fIP4RLlLHfMTY7H_tA/viewform' className='text-orange-500 font-bold text-xl'> تطوع معنا </a>  
</p>


          <button className='about-us-close-button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
