import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/mystyle.css";
import song from "./assets/song.mp3";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import useSound from "use-sound";

const Main = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [play, { pause, duration, sound }] = useSound(song);
    const timeParser = () => {
        let milliseconds = Math.floor((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours = Number((hours < 10) ? "0" + hours : hours);
        minutes = Number((minutes < 10) ? "0" + minutes : minutes);
        seconds = Number((seconds < 10) ? "0" + seconds : seconds);
        return minutes + ":" + seconds + "." + milliseconds;
    }
    const [currTime, setCurrTime] = useState({
        min: 0,
        sec: 0,
      });
    const [seconds, setSeconds] = useState();
    useEffect(() => {
        const sec = duration / 1000;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        const time = {
          min: min,
          sec: secRemain
        };
    });
    useEffect(() => {
        const interval = setInterval(() => {
          if (sound) {
            setSeconds(sound.seek([])); 
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrTime({
              min,
              sec,
            });
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [sound]);
    return (
        <div className="h-100 d-flex screen-tile align-items-center min-vh-100 justify-content-center">
            <div className="rounded-2 player-tile p-5 text-center">
                <div className="justify-content-center align-items-center pb-3">
                    <img className="rounded-3" src="https://picsum.photos/100/100" />
                </div>
                <div>
                    <h4>Levitating</h4>
                    <h6>Dua Lipa</h6>
                </div>
                <div>
                    <button className="border-0 bg-transparent">
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <BiSkipPrevious />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            {isPlaying ?
                                <AiFillPlayCircle onClick={() => { play(); setIsPlaying(false); }} /> : <AiFillPauseCircle onClick={() => { pause(); setIsPlaying(true); }} />}
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <BiSkipNext />
                        </IconContext.Provider>
                    </button>
                </div>
                <div className="pt-2">
                    <input type="range" value={seconds} min="0" max={duration / 1000} defaultValue="0" className="timeline" onChange={(e) => { sound.seek([e.target.value]); }} />
                </div>
                <div>
                <h6 className="float-start timeFont">{ currTime.min + ":" + currTime.sec }</h6>
                <h6 className="float-end timeFont">{timeParser()}</h6>
                </div>
            </div>
        </div>
    )
}
export default Main;