import backgroundPattern from '../../assets/background-pattern.svg';
import logo from "../../assets/logo.svg";
import phone from "../../assets/phonecall.svg";

export function Footer(){
    return(
        <div className="h-[890px] bg-transparent flex flex-col z-[]">
            <div className="h-[125px] flex items-end justify-center">
                <img className="w-[1394px] h-[38.4px] mb-[5px]" src="/blackfooter.png" alt="blackbar"/>
            </div>
            <div className="-mb-[30px] z-50 flex justify-between">
                <div>
                    <div className="h-[10px] w-[24px] bg-[rgba(238,236,217,1)]"></div>
                    <div className="h-[10px] w-[16px] bg-[rgba(238,236,217,1)]"></div>
                    <div className="h-[10px] w-[8px] bg-[rgba(238,236,217,1)]"></div>
                </div>
                <div className="items-end flex flex-col">
                    <div className="h-[10px] w-[24px] bg-[rgba(238,236,217,1)]"></div>
                    <div className="h-[10px] w-[16px] bg-[rgba(238,236,217,1)]"></div>
                    <div className="h-[10px] w-[8px] bg-[rgba(238,236,217,1)]"></div>
                </div>
            </div>
            <div 
                className="w-full flex-grow bg-alch-dark"
                style={{
                    backgroundImage: `url(${backgroundPattern})`,
                    backgroundRepeat: "repeat",
                }} 
            >
                <div
                    className="w-full h-full flex flex-col"
                >
                    <div className="flex w-full justify-around mt-[112px]">
                        <div>
                            <div className='flex flex-row justify-center items-center gap-[6.33px] w-[213.68px] h-[69px]'>
                                <img className="w-[37.99px] h-[43.71px]" src={logo} alt="logo"/>
                                <div className='text-alch-cream  w-[170px] h-[65.83px] flex flex-col justify-center'>
                                    <p className='font-modernoir font-bold text-[37.99px] w-[170px] h-[42px] leading-none'>ALCHERINGA</p>
                                    <p className='font-sans h-[27px] w-[119px]  font-normal text-[18.99px] leading-none'>IIT GUWAHATI</p>
                                </div>
                            </div>   
                            <div className=" w-[240px] h-[40px] justify-between flex gap-4 mt-[59px]">
                                <img src="/insta.png" alt="instagram"/>    
                                <img src="/youtube.png" alt="youtube"/>    
                                <img src="/linkedin.png" alt="linkedin"/>    
                                <img src="/x.png" alt="X"/>    
                            </div>  
                        </div> 
                        <div className="text-alch-cream w-[189px]">
                            <h1 className="h-[35] font-medium text-[32px] leading-[110.00000000000001%] tracking-[0.05em] mb-[10px]">LINKS</h1>
                            <ul className="h-[95px] font-bold text-sm leading-[140%] tracking-[0.02em]">
                                <li>About us</li>
                                <li>Modules and Competitions</li>
                                <li>Testimonials</li>
                                <li>FAQs</li>
                            </ul>
                        </div>
                        <div className="text-alch-cream h-[180px] w-[304px]">
                            <h1 className="h-[35] font-medium text-[32px] leading-[110.00000000000001%] tracking-[0.05em] mb-[10px]">CONTACT US</h1>
                            <div className="text-sm leading-[140%] tracking-[0.02em] flex justify-between">
                                <ul>
                                    <li className="h-[20px] font-bold mb-[10px]">Sudhanshu Raj</li>
                                    <li className='mb-[10px]'>PR Head</li>
                                    <div className='flex flex-row gap-[10px]'><img className='w-[20px] h-[22.52px]' src={phone} alt='phone'/><li className='inline-block'>+91 82929 67325</li></div>
                                </ul>
                                <ul>
                                    <li className="h-[20px] font-bold mb-[10px]">Sidharth Shukla</li>
                                    <li className='mb-[10px]'>PR Head</li>
                                    <div className='flex flex-row gap-[10px]'><img className='w-[20px] h-[22.52px]' src={phone} alt='phone'/><li className='inline-block'>+91 73546 47811</li></div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img className="w-[1470px] h-[195px] ml-auto mr-auto mt-[102px]" src="/footer1.png" alt="footer1"/>
                    <div className="text-alch-cream text-sm font-normal tracking-[0.02em] leading-[140%] h-[40px] w-[1293px] ml-[79px] mt-[60px] flex justify-between"> <a  href="https://alcheringa.co.in/"  target="_blank" rel="noopener noreferrer" className="inline-block w-[257px] h-[20px] text-alch-cream no-underline">Alcheringa @ 2025. All rights reserved.</a> <div className="inline-block flex justify-between w-[339px] h-[40px]"><p className="inline-block">Contact us</p> <p className="inline-block">Feedback</p> <p className="inline-block">Privcy Policy</p> </div> </div>
                    <img className="w-full h-[40px] mt-auto" src="/image131footer.png" alt="image131"/>
                </div>
            </div>
        </div>
    )
}