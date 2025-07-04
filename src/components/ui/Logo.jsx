import logo from "../../assets/eventify_logo.png";

export default function Logo({width = '100px'}) {
  return (
    <div style={{width}}>
        <img 
        src={logo} 
        alt="Logo" 
        className="w-full h-auto object-contain"
        />
    </div>
  )
}
