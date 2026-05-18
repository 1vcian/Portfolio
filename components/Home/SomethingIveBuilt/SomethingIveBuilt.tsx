import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ArrowIcon from "../../Icons/ArrowIcon";
import Img from "../../smallComp/image/Img";
import GithubIcon from "../../Icons/GithubIconForSomethingIveBuild";
import ExternalLink from "../../Icons/ExternalLink";

export default function SomethingIveBuilt() {
  const router = useRouter();
  return (
    <div
      id="SomethingIveBuiltSection"
      className=" flex flex-col xl:space-y-28 space-y-12 bg-AAprimary w-full  
     2xl:px-72 lg:px-24 md:px-16 sm:px-16 py-32 px-4"
    >
      {/* // ? Title   */}
      <div data-aos="fade-up" className=" flex flex-row  items-center md:px-0">
        <ArrowIcon className={"flex-none h-5 md:h-6 w-5 md:w-5 translate-y-[2px] text-AAsecondary"} />
        <div className="flex-none flex-row space-x-2 items-center pr-2">
          <span className="text-AAsecondary font-sans text-sm  sm:text-xl"> 03.</span>
          <span className=" font-bold tracking-wider text-gray-200 text-lg md:text-2xl w-44 md:w-56 opacity-85">
            {" "}
            Some Things I&apos;ve Built
          </span>
        </div>
        <div className="bg-gray-400 h-[0.2px] w-full xl:w-1/3 md:w-1/2"></div>
      </div>

      <div className="flex flex-col   xl:space-y-36 space-y-8 md:space-y-28">


        {/* // ? Project sentinel ai */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <div
                className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
              ></div>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/sentinel.png"} alt={"Sentinel AI Pipeline"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/sentinel.png"} alt={"Sentinel AI Pipeline"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Innovative Solution</span>
                <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                  AI Sentinel Image Pipeline
                </span>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  Designed a revolutionary <span className="text-AAsecondary">AI-powered pipeline</span> on Google Cloud Vertex AI to upscale
                  10m resolution Sentinel-2 photos to <span className="text-AAsecondary">1m resolution</span>. This dramatically reduced
                  operational costs from ~€4M (for 30cm every 3 years) down to <span className="text-AAsecondary">~€500 per month</span>,
                  allowing users to access high-quality updated imagery every single month.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">AI Super Resolution</span>
                <span className="pr-4 z-10">Google Vertex AI</span>
                <span className="pr-4 z-10">Sentinel-2</span>
              </ul>
            </div>
          </div>
        </div>

        {/* // ? Project Pokemon */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://1vcian.github.io/Pokemon-TCGP-Card-Scanner/" target={"_blank"} rel="noreferrer">
                <div

                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/cardscanner.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/cardscanner.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">

                <a href="https://1vcian.github.io/Pokemon-TCGP-Card-Scanner/" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Card Scanner
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  I developed an AI-powered <span className="text-AAsecondary">Pokemon card recognition system</span> that can identify cards from images
                  without requiring future training. It works with <span className="text-AAsecondary">all new cards</span> as they're released, running entirely
                  on the client side using less than <span className="text-AAsecondary">10MB of memory</span>. The system uses a OBB model and
                  custom image comparison percentual algorithms. The project has been <a href="https://tcgpocketcollectiontracker.com/" target={"_blank"} className="text-AAError">integrated into TCG Pocket Collection Tracker</a>,
                  the world's most popular Pokemon TCG tracker, as a main feature. I also contributed several <span className="text-AAsecondary">minor features</span> to
                  the repository beyond the AI scanner implementation.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">AI</span>
                <span className="pr-4 z-10">Segmentation</span>

              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <GithubIcon link="https://github.com/1vcian/Pokemon-TCGP-Card-Scanner" />
                <a href="https://1vcian.github.io/Pokemon-TCGP-Card-Scanner/" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* // ? Project  vinitaly*/}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://agea-vinitaly-2026.sian.it/" target={"_blank"} rel="noreferrer">
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Featured Project</span>
              </div>

              <Img src={"/Portfolio/agea.png"} alt={"Agea Vinitaly Project Screen shot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/agea.png"} alt={"Agea Vinitaly Project Screen shot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Featured Project</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Recent Project</span>
                <a href="https://agea-vinitaly-2026.sian.it/" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    AGEA Vinitaly 2026 App
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  Developed the official web application for <span className="text-AAsecondary">Vinitaly 2026</span> in collaboration with AGEA.
                  Leveraged <span className="text-AAsecondary">PMTiles technology</span> to efficiently visualize enormous geospatial datasets,
                  rendering all the agricultural plots of land across Italy with high performance.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Geospatial</span>
                <span className="pr-4 z-10">PMTiles</span>
                <span className="pr-4 z-10">React</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <a href="https://agea-vinitaly-2026.sian.it/" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* // ? Project EGNSS Capacitor */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://1vcian.me/egnss-capacitor/" target={"_blank"} rel="noreferrer">
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Recent Project</span>
              </div>

              <Img src={"/Portfolio/egnss.png"} alt={"EGNSS Capacitor Project"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/egnss.png"} alt={"EGNSS Capacitor Project"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Open Source Plugin</span>
                <a href="https://1vcian.me/egnss-capacitor/" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    EGNSS Capacitor
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  Developed a universal <span className="text-AAsecondary">Capacitor plugin</span> designed to guarantee <span className="text-AAsecondary">absolute geographic precision in Europe</span>. By integrating Galileo's OSNMA and EGNOS support, it exposes a unified API to read highly accurate GNSS coordinates from both internal device sensors and <span className="text-AAsecondary">external Bluetooth antennas</span> across Android, iOS, and Web.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Capacitor</span>
                <span className="pr-4 z-10">Bluetooth</span>
                <span className="pr-4 z-10">GNSS</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <GithubIcon link="https://github.com/1vcian/egnss-capacitor" />
                <a href="https://1vcian.me/egnss-capacitor/" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>





        {/* // ? Project wolf & mafia */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://wolfmafia.app/" target={"_blank"} rel="noreferrer">
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/wolfmafia.png"} alt={"Wolf & Mafia App"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/wolfmafia.png"} alt={"Wolf & Mafia App"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Developed from scratch</span>
                <a href="https://wolfmafia.app/" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Wolf & Mafia
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  A 100% offline <span className="text-AAsecondary">social deduction game</span> (Lupus in Tabula/Mafia) designed for Android and iOS.
                  Developed from scratch, the app runs <span className="text-AAsecondary">completely deterministically using seed-based generation</span>,
                  allowing full offline functionality without any internet or servers. Players join locally by <span className="text-AAsecondary">scanning a QR code</span>,
                  featuring a guided narrator mode, rollback mechanics, and automatic polling for seamless group play anywhere.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Android / iOS</span>
                <span className="pr-4 z-10">Offline Multiplayer</span>
                <span className="pr-4 z-10">QR Connect</span>
                <span className="pr-4 z-10">Game Dev</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <a href="https://wolfmafia.app/" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* // ? Project  fm*/}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://1vcian.me/fm" target={"_blank"} rel="noreferrer">
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Active</span>
              </div>

              <Img src={"/Portfolio/fm.png"} alt={"ForgeMaster Community Project"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content fm */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/fm.png"} alt={"ForgeMaster Community Project"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Active</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Community Favorite</span>
                <a href="https://1vcian.me/fm" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    ForgeMaster Community App
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  An <span className="text-AAsecondary">open-source project</span> created for the ForgeMaster gaming community.
                  It provides essential tools, trackers, and resources that are highly appreciated by players, completely developed and maintained for the community.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Open Source</span>
                <span className="pr-4 z-10">Community</span>
                <span className="pr-4 z-10">React</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <GithubIcon link="https://github.com/1vcian/fm" />
                <a href="https://1vcian.me/fm" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>



        {/* // ? Project  eatventure*/}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://eatventure-loot-predictor.vercel.app/" target={"_blank"} rel="noreferrer">
                <div
                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/eatventure.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/eatventure.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">
                <span className="text-AAsecondary text-base">Featured Project</span>
                <a href="https://eatventure-loot-predictor.vercel.app/" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Eatventure Loot Predictor
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  A tool for the mobile game &apos;Eatventure,&apos; with over <span className="text-AAsecondary">10 million installations</span>, to predict and plan chest openings.
                  I <span className="text-AAsecondary">reverse-engineered</span> Unity&apos;s RNG in JavaScript and implemented smart searches with
                  <span className="text-AAsecondary"> optimized DFS algorithms</span>. Users manually input their seeds, found in the game&apos;s save files,
                  allowing the tool to predict all future drops and guarantee any high-tier item in <span className="text-AAsecondary">fewer than 5 chests</span>,
                  compared to the usual average of 200.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Reverse Engineering</span>
                <span className="pr-4 z-10">RNG</span>
                <span className="pr-4 z-10">DFS Algorithm</span>
                <span className="pr-4 z-10">Game Tool</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <GithubIcon link="https://github.com/1vcian/eatventure-vercel" />
                <a href="https://eatventure-loot-predictor.vercel.app/" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>




        {/* // ? Project common cast*/}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://1vcian.github.io/Common-Cast/" target={"_blank"} rel="noreferrer">
                <div

                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/cast.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/cast.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">

                <a href="https://1vcian.github.io/Common-Cast/" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Common Cast
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  A mini web application that helps you find <span className="text-AAsecondary">common actors between two movies or TV shows</span>.
                  When you're watching something and an actor looks familiar, you can quickly discover where you've seen them before.
                  The app also provides <span className="text-AAsecondary">additional information</span> about the actors' filmography and
                  other <span className="text-AAsecondary">details about their careers</span>. Built to scratch my own itch of always wondering
                  "where have I seen this person before?"
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Api</span>
                <span className="pr-4 z-10">React</span>

              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <GithubIcon link="https://github.com/1vcian/Common-Cast" />
                <a href="https://1vcian.github.io/Common-Cast/" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>



        {/* // ? Project  geo mapping */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <div

                className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
              ></div>


              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/geo.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/geo.png"} alt={"Project Screen shot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">

                <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                  Openlayers Webapps
                </span>

              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  I developed multiple web applications for the Italian Ministry of Agriculture to manage
                  <span className="text-AAsecondary"> agricultural data and feature layers</span>. These full-stack solutions handle
                  <span className="text-AAsecondary"> massive batch processing</span> of geographic and administrative data. The applications include
                  comprehensive systems for <span className="text-AAsecondary">managing feature attributes and layers</span>, with the screenshot showing
                  just one example of the many tools developed. The solutions process extensive datasets while maintaining
                  <span className="text-AAsecondary"> high performance and reliability</span>.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">geoserver</span>
                <span className="pr-4 z-10">geopanda</span>
                <span className="pr-4 z-10">angular</span>
                <span className="pr-4 z-10">sql</span>
                <span className="pr-4 z-10">FullStack</span>
                <span className="pr-4 z-10">LLM</span>
                <span className="pr-4 z-10">SAM</span>
              </ul>

            </div>
          </div>
        </div>




        {/* // ? Project  univercity*/}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://github.com/davidedc97/UniverCity" target={"_blank"} rel="noreferrer">
                <div

                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/univercity.png"} alt={"UniverCity Project Screenshot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/univercity.png"} alt={"UniverCity Project Screenshot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">

                <a href="https://github.com/davidedc97/UniverCity" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    UniverCity
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  A collaborative platform for university students to share and organize study notes. The system features
                  <span className="text-AAsecondary"> intelligent note ranking</span> and <span className="text-AAsecondary">automatic mashup creation</span>
                  of the best notes for each subject. I implemented advanced <span className="text-AAsecondary">indexing algorithms</span> to ensure
                  high-quality content discovery. This project <span className="text-AAsecondary">won the Google Workshop competition</span>, and we had
                  the honor of <span className="text-AAsecondary">presenting it at Google's offices in Tel Aviv</span>. The platform includes user feedback
                  systems, digital document signing, and supports all file formats.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Flutter</span>
                <span className="pr-4 z-10">Node.js</span>
                <span className="pr-4 z-10">AWS</span>
                <span className="pr-4 z-10">Ranking Algorithm</span>
                <span className="pr-4 z-10">Google Winner</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <GithubIcon link="https://github.com/davidedc97/UniverCity" />
              </div>
            </div>
          </div>
        </div>


        {/* // ? Project smarthome */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://github.com/LNPacio/ProgettoOS" target={"_blank"} rel="noreferrer">
                <div

                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Completed</span>
              </div>

              <Img src={"/Portfolio/smarthouse.png"} alt={"Smart House Project Screenshot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/smarthouse.png"} alt={"Smart House Project Screenshot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Completed</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">

                <a href="https://github.com/LNPacio/ProgettoOS" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Smart House
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  A complete <span className="text-AAsecondary">home automation system</span> built with Arduino MEGA2560. The system features
                  <span className="text-AAsecondary"> PWM control</span> for lighting and devices, <span className="text-AAsecondary">ADC inputs</span> for
                  sensors, and a custom <span className="text-AAsecondary">shell interface</span> for remote control. Includes advanced features like
                  <span className="text-AAsecondary"> SSH connectivity</span> for mobile access, device naming system, and comprehensive channel management.
                  The solution provides <span className="text-AAsecondary">8 PWM outputs</span> and <span className="text-AAsecondary">8 ADC inputs</span>
                  for extensive home automation capabilities.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">Arduino</span>
                <span className="pr-4 z-10">C</span>
                <span className="pr-4 z-10">Shell</span>
                <span className="pr-4 z-10">PWM</span>
                <span className="pr-4 z-10">ADC</span>
                <span className="pr-4 z-10">SSH</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <GithubIcon link="https://github.com/LNPacio/ProgettoOS" />
              </div>
            </div>
          </div>
        </div>

        {/* // ? Project  */}
        <div data-aos="fade-up" className="relative md:grid md:grid-cols-12 w-full md:h-96">
          {/* Left image */}
          <div
            className="hidden bg-AAprimary z-10  py-4 
          absolute md:grid grid-cols-12 w-full h-full  content-center"
          >
            <div className="relative rounded w-full h-full col-span-7 ">
              <a href="https://hackappatoi.github.io/" target={"_blank"} rel="noreferrer">
                <div

                  className="absolute w-full h-full rounded bg-AAprimary 
           transition-opacity opacity-50 hover:opacity-0 hover:cursor-pointer duration-300"
                ></div>
              </a>

              <div className="absolute px-2 bg-AAprimary rounded  ml-4 mt-2 ">
                <span className="text-AAsecondary text-xl">Active</span>
              </div>

              <Img src={"/Portfolio/hackappatoi.png"} alt={"Hackappatoi Team Screenshot"} className={`w-full h-full object-cover object-center rounded`} />
            </div>
          </div>

          {/* right Content */}
          <div className=" md:absolute py-4  md:grid md:grid-cols-12 w-full h-full  content-center ">
            {/* background for text in mobile responsive */}
            <div className="absolute w-full h-full bg-opacity-70 z-0">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full bg-AAsecondary opacity-10 z-10"></div>
                <div className="absolute w-full h-full bg-AAprimary opacity-80 z-10"></div>
                <Img src={"/Portfolio/hackappatoi.png"} alt={"Hackappatoi Team Screenshot"} className={`w-full h-full object-cover object-center`} />
              </div>
            </div>
            <div className="absolute w-full   rounded  ml-4 mt-2  text-end pr-8">
              <div className="w-full"></div>
              <span className="text-AAsecondary sm:text-lg bg-AAprimary px-2 py-1 rounded">Active</span>
            </div>
            <div
              className="px-8 pt-8 sm:pt-12 md:py-0 xl:col-span-6 xl:col-start-7 col-start-5 
            col-span-8 flex flex-col items-start md:items-end sm:space-y-3 space-y-1"
            >
              <div className="flex flex-col space-y-1 md:items-end z-10">

                <a href="https://hackappatoi.github.io/" target={"_blank"} rel="noreferrer">
                  <span className=" md:text-gray-200 text-AAsecondary font-bold text-xl hover:cursor-pointer">
                    Hackappatoi CTF Team
                  </span>
                </a>
              </div>
              <div className="w-full md:bg-AAtertiary rounded-md py-6 md:p-6  z-10">
                <p className="text-gray-300 md:text-gray-400 text-left md:text-right">
                  Active member of Sapienza University's <span className="text-AAsecondary">CTF team Hackappatoi</span>, participating in various
                  cybersecurity competitions. I contribute to the team by <span className="text-AAsecondary">solving challenges</span> and
                  <span className="text-AAsecondary"> writing detailed writeups</span> of particularly interesting solutions. My focus areas include
                  <span className="text-AAsecondary"> reverse engineering</span>, <span className="text-AAsecondary">web exploitation</span>, and
                  <span className="text-AAsecondary"> forensic challenges</span>. The team regularly competes in international CTF events,
                  continuously improving our cybersecurity skills.
                </p>
              </div>
              <ul
                className="flex flex-wrap w-full text-gray-300 md:text-gray-400
               text-sm font-Text2 md:justify-end"
              >
                <span className="pr-4 z-10">CTF</span>
                <span className="pr-4 z-10">Cybersecurity</span>
                <span className="pr-4 z-10">Reverse Engineering</span>
                <span className="pr-4 z-10">Web Exploitation</span>
                <span className="pr-4 z-10">Forensic</span>
              </ul>
              <div className="z-10 flex fle-row space-x-5 sm:pt-0 pt-2">
                <a href="https://hackappatoi.github.io/" target={"_blank"} rel="noreferrer">
                  <ExternalLink url={""} router={router} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
