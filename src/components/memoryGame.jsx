import { useState, useMemo, useRef, useEffect } from 'react'

const BOX_DATA = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];

const MemoryGame = () => {

  const [selectedSeq, setSelectedSeq] = useState([]);
  const boxes = useMemo(() => BOX_DATA.flat(Infinity))
  const totalNums = boxes.reduce((acc, elem) => {
    if(elem === 1){
        acc += 1
    }
    return acc
  }, 0)
  const parentRef = useRef(null);

  const handleClick = (event, index) => {
    event.target.style.backgroundColor = "#0bcc59"
    setSelectedSeq([...selectedSeq, index]);

    // if (boxes.length === selectedSeq.length) {
    //   triggerDeselection()
    // }
  }

  useEffect(()=> {
    if(totalNums === selectedSeq.length){
        for(let i=0;i<selectedSeq.length;i++){
            setTimeout(() => {
                parentRef.current.children[selectedSeq[i]].style.backgroundColor = "white"
            }, i*200);
        }
    }
  })

//   const triggerDeselection = () => {
//     console.log("triggerDeselection called")
//     // const children = parentRef.current.children;
//     for (let i = 0; i < selectedSeq.length; i++) {
//       parentRef.current.children[selectedSeq[i]].style.backgroundColor = "white"
//     }
//   }

  return (
    <div ref={parentRef} className="conatiner" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: "5px" }}>
      {
        boxes.map((elem, index) => {
          if (elem) {
            return <button key={index} className="box" style={{ border: "1px solid black", height: "50px" }} onClick={(e) => handleClick(e, index)}></button>
          } else {
            return <button key={index} className="box" style={{ height: "50px" }} disabled={true}></button>
          }

        })
      }
    </div>
  )
}

export default MemoryGame