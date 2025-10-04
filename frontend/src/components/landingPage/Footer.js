export function Footer(){
    return(
        <div className="h-[890px] bg-transparent flex flex-col">
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
            <div className="w-full flex-grow bg-[rgba(23,23,23,1)]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: "url('/background.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="flex w-full justify-around">
                        <div>
                            <img className="w-[213.68px] h-[69px]" src="/logo.png" alt="logo"/>    
                            <div className=" w-[240px] h-[40px] justify-between flex gap-4">
                                <img src="/insta.png" alt="instagram"/>    
                                <img src="/youtube.png" alt="youtube"/>    
                                <img src="/linkedin.png" alt="linkedin"/>    
                                <img src="/x.png" alt="X"/>    
                            </div>  
                        </div> 
                        <div className="text-[rgba(238,236,217,1)] w-[189px]">
                            <h1 className="h-[35] font-medium text-[32px] leading-[110.00000000000001%] tracking-[0.05em] mb-[10px]">LINKS</h1>
                            <ul className="h-[95px] font-bold text-sm leading-[140%] tracking-[0.02em]">
                                <li>About us</li>
                                <li>Modules and Competitions</li>
                                <li>Testimonials</li>
                                <li>FAQs</li>
                            </ul>
                        </div>
                        <div className="text-[rgba(238,236,217,1)] h-[180px] w-[304px]">
                            <h1 className="h-[35] font-medium text-[32px] leading-[110.00000000000001%] tracking-[0.05em] mb-[10px]">CONTACT US</h1>
                            <div className="text-sm leading-[140%] tracking-[0.02em] flex justify-between">
                                <ul>
                                    <li className="h-[20px] font-bold">Sudhanshu Raj</li>
                                    <li>PR Head</li>
                                    <li>+91 82929 67325</li>
                                </ul>
                                <ul>
                                    <li className="h-[20px] font-bold">Sidharth Shukla</li>
                                    <li>PR Head</li>
                                    <li>+91 73546 47811</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <img className="w-[1433px] h-[195px] ml-[4px]" src="/footer1.png" alt="footer1"/>
                    <div className="text-[rgba(238,236,217,1)] text-sm font-normal tracking-[0.02em] leading-[140%] h-[40px] w-[1293px] ml-[79px] flex justify-between"> <p className="inline-block w-[257px] h-[20px] ">Alcheringa @ 2025. All rights reserved.</p> <div className="inline-block flex justify-between w-[339px] h-[40px]"><p className="inline-block">Contact us</p> <p className="inline-block">Feedback</p> <p className="inline-block">Privcy Policy</p> </div> </div>
                    <img className="w-full h-[40px]" src="/image131.png" alt="image131"/>
                </div>
            </div>
        </div>
    )
}