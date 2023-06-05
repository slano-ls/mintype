import mascotTop from "../public/mascotTop.png";
import mascotEyesHL from "../public/mascotEyesHL.png";
import mascotEyes from "../public/mascotEyes.png";
import mascotBlush from "../public/mascotBlush.png";
import { MascotColor, MascotCStroke, MascotEyes, MascotShadow } from "./MascotLayer";

const Mascot = () => {
    return (
        <div className="mascot">
            <img src={mascotTop} alt="" style={{ zIndex: 2 }} />
            <img src={mascotEyesHL} alt="" style={{ zIndex: 6 }} />
            <img src={mascotBlush} alt="" style={{ zIndex: 5}} />
            <MascotEyes fill="var(--hl-color)" zIndex={6} />
            <MascotCStroke fill="var(--bg-color)" zIndex={3} />
            <MascotShadow fill="#333" zIndex={4} opacity={0.3} />
            <MascotColor fill="var(--hl-color)" zIndex={1} />
            
        </div>
    );
};

export default Mascot;
