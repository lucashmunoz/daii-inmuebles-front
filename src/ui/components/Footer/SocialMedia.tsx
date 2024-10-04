import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function SocialMedia() {
  return (<div style={{
    display: "flex", gap: 24, justifyContent: "center"
  }}>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
      style={{
        color: "#fff"
      }}>
      <FaFacebookF size={24}/>
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
