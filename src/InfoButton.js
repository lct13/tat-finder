import './App.css';
import { AiFillQuestionCircle } from "react-icons/ai";

function InfoButton() {
  return(
    <button className='info-button' onClick={()=>{
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    }}>
      <AiFillQuestionCircle/>
    </button>
  );
}

export default InfoButton;