import React, { useState, useEffect } from 'react'
import "./Calculator.css"
import { BiRupee } from 'react-icons/bi';
import { BsPercent } from 'react-icons/bs';
import PopUp from './PopUp/PopUp';

function Calculator() {
    const [showProfit, setShowProfit] = useState(true);
    const [displayGST, setDisplayGST] = useState(0);
    const [gstAmt, setGstAmt] = useState(0);
    const [gstRate, setGstRate] = useState(5);
    const [profit, setProfit] = useState(0);
    const [totalGST, setTotalGst] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    const [gstType, setGstType] = useState(true);
    const [btnPopup, setBtnPopup] = useState(false)
    const [profitPercentage, setProfitPercentage] = useState(0);
    const [toggleGst, setToggleGst] = useState(true);

    const calculateGST = (gst, pro, rate, display, totalGST, totalProfit, profitP) => {

        if (gstType) {
            // console.log("This is exclusive !")
            const gstCalculated = parseFloat(gstAmt) + (parseFloat(gstAmt) * parseFloat(gstRate) / 100);
            const gstWithProfit = (parseFloat(gstCalculated) * parseFloat(profit)) / 100;
            setDisplayGST(parseFloat(parseFloat(gstCalculated) + parseFloat(gstWithProfit)).toFixed(2));

            const totalG = ((rate * gst) / 100) + (pro * ((rate * gst) / 100) / 100);
            setTotalGst(parseFloat(totalG).toFixed(2));

            const totalP = display - gst - totalG;
            setTotalProfit(parseFloat(totalP).toFixed(2));

            // console.log(totalGST);
            // console.log(totalProfit);

            // console.log("============================");
            // console.log("Gst input : " + gst);
            // console.log("Gst display : " + display);
            // console.log("Profit percentage : "+ pro);
            // console.log("Gst rate: " + rate);
            // console.log("============================");
        } else {

            const gstCalculated = parseFloat(gstAmt);
            const gstWithProfit = parseFloat(gstCalculated) + (parseFloat(profit) * parseFloat(gstCalculated)) / 100;
            setDisplayGST(parseFloat(gstWithProfit).toFixed(2));

            const totalG = parseFloat(display) - (parseFloat(display) * (100 / (100 + rate)));
            setTotalGst(parseFloat(totalG).toFixed(2));

            if (profit != 0) {
                const totalP = parseFloat(display) - parseFloat(totalGST) - parseFloat(gst);
                setTotalProfit(parseFloat(totalP).toFixed(2));
            }

            const percentP = parseFloat((totalProfit / gst) * 100).toFixed(2);
            setProfitPercentage(parseFloat(percentP).toFixed(2));

        }
    }

    useEffect(() => {
        calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
    }, [gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage])

    return (
        <>
            <div className="calculator_container">
                <div className="calculator_innercontainer">
                    <div className="calculator_inputs">
                        <div className="calculator_header">
                            <h1>GST Calculator</h1>
                            <p>The easiest way for businesses to calculate their GST</p>
                        </div>
                        <div className="gst_option">
                            <>
                                <input type="radio" id="exclusive" name="gst_type" value="exclusive"
                                    onChange={(e) => {
                                        setGstType(true);
                                    }}
                                />
                                <label htmlFor="exclusive">Exclusive of GST</label>
                            </>
                            <>
                                <input type="radio" id="inclusive" name="gst_type" value="inclusive"
                                    onChange={(e) => {
                                        setGstType(false);
                                    }}

                                />
                                <label htmlFor="inclusive" >Inclusive of GST</label>
                            </>
                        </div>
                        <div className="calculator_takeinputs">
                            <p><span>Cost of Goods / Services </span></p>
                            <div className="takeinput takeinput_one">
                                <BiRupee size={30} />
                                <input type="number" name="gst" id="gstval" placeholder="Enter Amount Here"
                                    onChange={(e) => {
                                        setGstAmt(parseFloat(e.target.value));
                                        calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
                                    }}
                                />
                            </div>
                            {showProfit ?
                                <div className="show_profit">
                                    {/* {gstType ? */}
                                    <p onClick={() => {
                                        showProfit ? setShowProfit(false) : setShowProfit(true);
                                    }}>+ Add Profit Ratio</p><div></div>
                                    {/* } */}
                                </div> :
                                <>
                                    <p><span>Profit Ratio</span></p>
                                    <div className="takeinput takeinput_two">
                                        <input type="number" name="profit" id="profitpercentage" placeholder="Enter Profit Ratio Here"
                                            onChange={(e) => {
                                                setProfit(e.target.value);
                                                calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
                                            }}
                                        />
                                        <BsPercent size={30} />
                                    </div>
                                </>
                            }
                        </div>
                        <div className="calculator_rates">
                            <p><span>Select GST Rate</span></p>
                            <div className="gst_rates">
                                <button onClick={(e) => {
                                    setGstRate(3);
                                    calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
                                }} className={gstRate === 3 ? "button_active" : "button_inactive"}>3%</button>
                                <button onClick={(e) => {
                                    setGstRate(5);
                                    calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
                                }} className={gstRate === 5 ? "button_active" : "button_inactive"}>5%</button>
                                <button onClick={(e) => {
                                    setGstRate(12);
                                    calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
                                }} className={gstRate === 12 ? "button_active" : "button_inactive"}>12%</button>
                                <button onClick={(e) => {
                                    setGstRate(18);
                                    calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
                                }} className={gstRate === 18 ? "button_active" : "button_inactive"}>18%</button>
                                <button onClick={(e) => {
                                    setGstRate(28);
                                    calculateGST(gstAmt, profit, gstRate, displayGST, totalGST, totalProfit, profitPercentage);
                                }} className={gstRate === 28 ? "button_active" : "button_inactive"}>28%</button>

                            </div>
                        </div>
                    </div>
                    <div className="calculator_display">
                        <div className="image_holder">
                            <div className="display_price">
                                {isNaN(parseFloat(displayGST)) ? parseFloat(0).toFixed(2) : parseFloat(displayGST).toFixed(2)}
                            </div>

                            <div className="display_price_inner">
                                <div className="total_profit">
                                    ₹ {isNaN(Math.abs(totalProfit).toFixed(2)) ? parseFloat(0).toFixed(2) : (Math.abs(totalProfit).toFixed(2))}
                                </div>
                                <div className="total_gst">
                                    ₹ {isNaN(totalGST) ? parseFloat(0).toFixed(2) : totalGST}
                                </div>
                            </div>

                            <div className="get_table">
                                <p onClick={() => { setBtnPopup(true) }}>Check Full Breakup</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <PopUp trigger={btnPopup}>
                <div className="popup_inner">
                    <div className="popup_header">
                        <h2>GST Calculation Full Breakup</h2>
                        <p onClick={() => { setBtnPopup(false) }}>✕</p>
                    </div>
                    <div className="popup_igst">
                        <p>State of Billing is not same as the<br />State of Production</p>
                        <label className="switch">
                            <input type="checkbox"
                                onChange={() => {
                                    console.log(toggleGst);
                                    toggleGst ? setToggleGst(false) : setToggleGst(true);
                                }
                                } />
                            <span className="slider round"></span>
                        </label>

                    </div>
                    <div className="popup_values">

                        <div className="popup_value popup_value1">
                            <p>Cost of Goods / Services</p>
                            <span>₹ {gstAmt}</span>
                        </div>
                        {profit != 0 ?
                            <div className="popup_value popup_value0">
                                {gstType?<p>Profit (at {profit}%)</p>:<p>Effective Profit (at {profitPercentage}%)</p>}
                                <span>₹ {totalProfit}</span>
                            </div> : ""
                        }
                        <div className="popup_value popup_value2">
                            <p>GST {gstRate}%</p>
                        </div>
                        {
                            toggleGst ? <>
                                <div className="popup_value popup_value3">
                                    <p>CGST {gstRate / 2}%</p>
                                    <span>₹ {parseFloat(totalGST / 2).toFixed(2)}</span>
                                </div>
                                <div className="popup_value popup_value4">
                                    <p>SGST {gstRate / 2}%</p>
                                    <span>₹ {parseFloat(totalGST / 2).toFixed(2)}</span>
                                </div></> :
                                <div className="popup_value popup_value4">
                                    <p>IGST {gstRate}%</p>
                                    <span>₹ {parseFloat(totalGST).toFixed(2)}</span>
                                </div>
                        }
                    </div>
                    <div className="popup_total">
                        <p>Total selling price:</p>
                        <span>₹ {parseFloat(displayGST).toFixed(2)}</span>
                    </div>
                </div>
            </PopUp>
        </>
    )
}

export default Calculator