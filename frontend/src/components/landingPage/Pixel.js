    import { useState } from "react";
    import { useEffect } from "react";
    import axios from "axios";
    import backgroundPattern from '../../assets/background-pattern.svg';
    import lotus from "../../assets/lotus.svg"
    import flower from "../../assets/heading-icon-red.svg"

    export function Pixel() {
        const token = localStorage.getItem("access"); // check login
        const columns = 36;
        const rows = 17;
        const [highlight, setHighlight] = useState([]);
        const [animationdone, setAnimationdone] = useState(false);
        const [animationstart, setAnimationstart] = useState(false);
        const [yourturn, setYourturn] = useState(false);
        const [animation1, setAnimation1] = useState(false);
        const [cellSize, setCellSize] = useState(
            window.innerWidth < 640 ? 6.68 : 20
        );

        useEffect(() => {
            const handleResize = () => {
                setCellSize(window.innerWidth < 640 ? 6.68 : 20);
            };
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        const animation2 = [{row: 7, col: 18},{row: 9, col: 18},{row: 8, col: 17},{row: 8, col: 19}];
        const animation3 = [];

        const row1 = 8;
        const col1 = 17;
        for(let i = 1; i < 5; i++){
            for(let j = 0; j < 3; j++){
                const r1 = row1 - i;//for left
                const r2 = row1 + i;//for left
                const c1 = col1 - i - j;//for left

                const r3 = row1 - 1 - i - j;// for top
                const c2 = col1 + 1 - i;//for top
                const c3 = col1 + 1 + i;//for top

                if(r1 >= 0 && r1 < rows && r2 >= 0 && r2 < rows && c1 >= 0 && c1 < columns){
                    animation2.push({row: r1, col: c1});//left
                    animation2.push({row: r2, col: c1});//left
                    animation2.push({row: r3, col: c2});//top
                    animation2.push({row: r3, col: c3});//top
                    animation2.push({row: 16 - r1, col: 36 - c1});//right
                    animation2.push({row: 16 - r2, col: 36 - c1});//right
                    animation2.push({row: 16 - r3, col: 36 - c2});//bottom
                    animation2.push({row: 16 - r3, col: 36 - c3});//bottom
                }
            }
        }

        const animation3Part0 = [{row: 5, col: 15}, {row: 5, col: 20}];

        const animation3Part1 = [{row: 6, col: 13}, {row: 6, col: 22}];

        const animation3Part2 = [];

        for (let i = 0; i < 4; i++) {
            let j = 2*(i) + 1;
            //let k = j/2 + 1;
            while(j){
                animation3Part2.push({row: 9 + j -(i + 1), col: 14 + i});
                animation3Part2.push({row: 9 + j -(i + 1), col: 35 - 14 - i});
                animation3Part1.push({row: 7 + j -(i + 1), col:  7 + i});
                animation3Part1.push({row: 7 + j -(i + 1), col:  35 - 7 - i});
                if(i === 3){
                    animation3Part1.push({row: 4 + j - 1, col: 11});
                    animation3Part1.push({row: 4 + j - 1, col: 35 - 11});
                }

                if(i === 2){
                    animation3Part1.push({row: 5 + j - 1, col: 12});
                    animation3Part1.push({row: 5 + j - 1, col: 35 - 12});
                }

                if ( j - i - 2 < 0 ){
                    let k = j;
                    animation3Part0.push({row: 3 + k -(i + 1), col: 14 + i})
                    animation3Part0.push({row: 3 + k -(i + 1), col: 35 - 14 - i})
                    animation3Part0.push({row: 4, col: 14 + i})
                    animation3Part0.push({row: 4, col: 21 - i})
                }
                j--;
            }
        }

        const animation3Part3 = [{row: 11, col: 13}, {row: 14, col: 16},{row: 11, col: 22}, {row: 14, col: 19},  ]

        const skip = [
            [0,0], [0,5], [4,0], [4,4], [4,5]
        ];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 6; j++) {
                if (!skip.some(([x, y]) => x === i && y === j)) {
                    animation3Part3.push({ row: 16 - i, col: 10 + j });
                    animation3Part3.push({ row: 16 - i, col: 35 - 10 - j });
                }
            }
        }

        animation3.push(...animation3Part3, ...animation3Part2, ...animation3Part1, ...animation3Part0);


        useEffect(() => {
            if (token) {
                axios.get("http://localhost:8000/profile/", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => {
                    console.log("hi",res.data);
                    if (res.data.user && res.data.user.pixel_highlight) {
                        setHighlight(res.data.user.pixel_highlight);
                    }
                })
                .catch(err => console.error("Profile fetch error:", err));
            }
        }, [token]);

        const customTransparent1 = [
            { row: 0, col: 0 }, { row: 0, col: 1 },
            { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
            { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 },
            { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 },
            { row: 4, col: 0 }, { row: 4, col: 1 },
            { row: 5, col: 0 }
        ];

        const customwight1 = [
            { row: 0, col: 2 }, { row: 1, col: 3 }, { row: 2, col: 4 }, { row: 3, col: 3 }, { row: 4, col: 2 }, { row: 5, col: 1 }, { row:6 , col: 0 }
        ];

        const customTransparent2 = customTransparent1.map(cell => ({
            row: cell.row,
            col: 35 - cell.col
        }));
        const customwight2 = customwight1.map(cell => ({
            row: cell.row,
            col: 35 - cell.col
        }));

        const customTransparent3 = customTransparent1.map(cell => ({
            row: 16 - cell.row,
            col: cell.col
        }));
        const customwight3 = customwight1.map(cell => ({
            row: 16 - cell.row,
            col: cell.col
        }));

        const customTransparent4 = customTransparent1.map(cell => ({
            row: 16 - cell.row,
            col: 35 - cell.col
        }));
        const customwight4 = customwight1.map(cell => ({
            row: 16 - cell.row,
            col: 35 - cell.col
        }));

        const transperent = [...customTransparent1, ...customTransparent2, ...customTransparent3, ...customTransparent4];
        const wight = [...customwight1, ...customwight2, ...customwight3, ...customwight4];

        const handleclick = (row, col) => {
            if (animationdone){
                // Check if the clicked cell is "clickable"
                const isTransparent = transperent.some(h => h.row === row && h.col === col);
                const isWhite = wight.some(h => h.row === row && h.col === col);

                if (isTransparent || isWhite) {
                    // Do nothing if cell is transparent or white
                    return;
                }

                const exist = highlight.some(h => h.row === row && h.col === col);
                console.log({row, col});
                if(exist){
                    setHighlight(highlight.filter(h => !(h.row === row && h.col === col)));
                }else{
                    setHighlight([...highlight, {row, col}]);
                }
            }
        }

        // Create 2D array for game 
        const grid = Array.from({ length: rows }, (_, r) =>
            Array.from({ length: columns }, (_, c) => ({ row: r, col: c }))
        );

        function wait(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function animation(){
            setAnimation1(true);
            await wait(1500);
            setAnimationstart(true);
            setAnimation1(false);
            setHighlight(animation2);
            await wait(1500);
            setHighlight(animation3);
            await wait(1500);
            setHighlight([]);
            setYourturn(true);
            await wait(1500);
            setYourturn(false);
            setAnimationdone(true);
        }

        const submit = async() => {
            if(!token){
                window.location.href = '/login';
            }else{
                if ( highlight.length === 0 ){
                    alert("click on boxexs");
                }else{
                    try{
                        const res = await axios.post("http://localhost:8000/auth/complete-profile/", 
                            { pixel_highlight: highlight },
                            { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("submited", highlight);
                    console.log("Updated profile from backend:", res.data);
                    alert("submited");
                    setHighlight([]);
                    }catch(err){
                        console.error("save error:", err);
                        alert("failed to save highlights");
                    }
                }
            }
        }

        return (
            <div 
                className="h-[780px] w-full bg-alch-dark flex flex-col justify-between items-center"
                style={{
                    backgroundImage: `url(${backgroundPattern})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}    
            >
                    <div className="flex justify-center items-center mt-[166px]">
                        <div className="flex items-center ">
                            {/* Left strip */}
                            <div className="flex flex-col w-[5px]">
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[120px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                            </div>

                            {/* Middle column */}
                            <div className="flex flex-col w-[20.58px]">
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[80px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                            </div>

                            {/* Right big block */}
                            <div className="flex flex-col">
                                <div className="h-[20px] w-[144.06px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[400px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[400px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[400px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[144.06px] bg-[rgba(238,236,217,1)]"></div>
                            </div>
                        </div>
                        <div
                            className="-mx-[30px] z-10 relative"
                            style={{
                                display: "grid",
                                gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
                                gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
                                gap: "0px",
                                width: `${columns * cellSize}px`,
                                height: `${rows * cellSize}px`,
                            }}
                        >
                            {animation1 && (
                                <img src={lotus} alt="lotus" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[254px] w-[373px]"/>
                            )}

                            {grid.flat().map(({ row, col }) => (
                                <div
                                    key={`${row}-${col}`}
                                    style={{
                                        //border: "1px solid #000",
                                        border: transperent.some(h => h.row === row && h.col === col)
                                                ? "none"
                                                :wight.some(h => h.row === row && h.col === col)
                                                ?"none"
                                                : "0.125px solid rgba(238, 236, 217, 1)",
                                        backgroundColor: transperent.some(h => h.row === row && h.col === col)
                                                ? "transparent"
                                                :wight.some(h => h.row === row && h.col === col)
                                                ?"rgba(238, 236, 217, 1)"
                                                :highlight.some(h => h.row === row && h.col === col)
                                                ? "rgba(239,82,67,1)"
                                                : "rgba(44, 44, 44, 1)",

                                    }}
                                    onClick={()=>{handleclick(row, col)}}
                                />
                            ))}
                            
                            {( yourturn &&
                                <div className="flex justify-center items-center gap-[10px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px]  h-[53px] text-[#EF5243] text-center font-modernoir text-xl sm:text-5xl font-extrabold">
                                    <img src={flower} alt="flower"/>
                                    <p className="w-[364px] h-[53px] " >Now it’s your turn</p>
                                    <img src={flower} alt="flower"/>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center">
                            {/* Left strip */}
                            <div className="flex flex-col items-end">
                                <div className="h-[20px] w-[144.06px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[400px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[400px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[400px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[20px] w-[20.58px] bg-transparent"></div>
                                <div className="h-[20px] w-[144.06px] bg-[rgba(238,236,217,1)]"></div>
                            </div>

                            {/* Middle column */}
                            <div className="flex flex-col w-[20.58px]">
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[80px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                            </div>

                            {/* Right big block */}
                            <div className="flex flex-col w-[5px]">
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[120px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                                <div className="h-[30px] bg-transparent"></div>
                                <div className="h-[20px] bg-[rgba(238,236,217,1)]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-[50px]">
                        {!animationstart && <div style={{backgroundImage: "url('/explorebg.png')"}} className="w-[200px] h-[46px] cursor-pointer font-sans flex justify-center items-center font-bold text-base" onClick={()=>{animation();}}>Explore the Fun Side</div>}
                        {animationstart && !animationdone && <div className="w-[200px] h-[46px] cursor-pointer font-sans flex justify-center items-center font-bold text-base"></div>}
                        {animationdone && <div style={{backgroundImage: "url('/Submit.png')",backgroundSize: "cover",backgroundPosition: "center",backgroundRepeat: "no-repeat",}} className="w-[116.29px] h-[46px] cursor-pointer font-sans flex justify-center items-center font-bold text-base" onClick={()=>{submit();}}>Submit</div>}
                    </div>
                    <img className="w-full h-[40px] mt-auto" src="/image131.png" alt="image131"/>
            </div>
    );
    }
