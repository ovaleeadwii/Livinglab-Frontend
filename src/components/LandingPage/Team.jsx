import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import affan from "../../assets/affan.svg";
import auliya from "../../assets/auliya.svg";
import Herly from "../../assets/Herly.svg";
import Pakardian from "../../assets/pakardian.svg";
import Rey from "../../assets/Rey.svg";
import Ade from "../../assets/Ade.svg";

const Team = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="min-h-screen  bg-[#FFFFFF] py-10 md:py-40" id="Team">
      <h1 className="md:text-5xl text-3xl font-bold text-[#537052] text-center">
        Our Team
      </h1>

      <div className="hero ">
        <div className="hero-content ">
          <div className="hero-content  " data-aos="fade-left">
            <div className="carousel rounded-box flex flex-col items-start md:items-center lg:flex-row gap-5 md:gap-10 ">
              <div className="carousel-item ">
                <div className="card bg-[#FFFFFF] md:w-72 w-52 shadow-xl border border-[#537052]">
                  <figure className="px-10 pt-10">
                    <img src={Pakardian} alt="people" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center py-0 ">
                    <h2 className="card-title text-[#537052]">Manager</h2>
                  </div>
                  <div className="card-body items-center text-center bg-[#537052] rounded-xl">
                    <p className="text-white ">Dr Ardian Ulvan S.T.MSc</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="card bg-[#FFFFFF] md:w-72 w-52 shadow-xl border border-[#537052]">
                  <figure className="px-10 pt-10">
                    <img src={Herly} alt="people" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center py-0 ">
                    <h2 className="card-title text-[#537052]">Team Leader</h2>
                  </div>
                  <div className="card-body items-center text-center bg-[#537052] rounded-xl">
                    <p className="text-white ">M. Herly Pratama</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="card bg-[#FFFFFF] md:w-72 w-52 shadow-xl border border-[#537052]">
                  <figure className="px-10 pt-10">
                    <img src={Rey} alt="people" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center py-0 ">
                    <h2 className="card-title text-[#537052]">FrontEnd Dev</h2>
                  </div>
                  <div className="card-body items-center text-center bg-[#537052] rounded-xl">
                    <p className="text-white ">Alpriealian Renando</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="card bg-[#FFFFFF] md:w-72 w-52 shadow-xl border border-[#537052]">
                  <figure className="px-10 pt-10">
                    <img src={auliya} alt="people" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center py-0 ">
                    <h2 className="card-title text-[#537052]">IoT Engineer</h2>
                  </div>
                  <div className="card-body items-center text-center bg-[#537052] rounded-xl">
                    <p className="text-white ">Auliya putra Siregar</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="card bg-[#FFFFFF] md:w-72 w-52 shadow-xl border border-[#537052]">
                  <figure className="px-10 pt-10">
                    <img src={affan} alt="people" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center py-0 ">
                    <h2 className="card-title text-[#537052]">Backend Dev</h2>
                  </div>
                  <div className="card-body items-center text-center bg-[#537052] rounded-xl">
                    <p className="text-white ">M. Affan Siddiqi</p>
                  </div>
                </div>
              </div>
              <div className="carousel-item ">
                <div className="card bg-[#FFFFFF] md:w-72 w-52 shadow-xl border border-[#537052]">
                  <figure className="px-10 pt-10">
                    <img src={Ade} alt="people" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center py-0 ">
                    <h2 className="card-title text-[#537052]">Mobile Dev</h2>
                  </div>
                  <div className="card-body items-center text-center bg-[#537052] rounded-xl">
                    <p className="text-white ">Ade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
