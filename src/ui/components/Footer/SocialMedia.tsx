import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { WPP_NUMBER } from "../../../../globals.ts";

function SocialMedia() {
  return (<div style={{
    display: "flex", gap: 24, justifyContent: "center"
  }}>
    <a href={`https://api.whatsapp.com/send/?phone=${WPP_NUMBER}&text&type=phone_number&app_absent=0`} target="_blank" rel="noopener noreferrer"
      style={{
        color: "#fff"
      }}>
      <FaWhatsapp size={24}/>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
      style={{
        color: "#fff"
      }}>
      <FaInstagram size={24}/>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
      style={{
        color: "#fff"
      }}>
      <FaTwitter size={24}/>
    </a>
  </div>);
}

export default SocialMedia;
