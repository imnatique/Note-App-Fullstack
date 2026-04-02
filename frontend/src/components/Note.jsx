import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Note() {
  const [show, setShow] = useState(false)
  const handleShow=  ()=>{
    setShow(!show)
  }
  return (
    <div class="card position-relative" style={{width:'18rem', backgroundColor:'#FEC971'}}>
      <div class="card-body position-relative">
        <h5 class="card-title">Never Give Up until unless you become success</h5>
        <div className="bootomContent">
            <div className="date d-flex justify-content-between align-items-center">
                <h5 className="fs-6">1/4/2026</h5>
                {
                  show && (
                    <div className="dropdown">
                    <FaPen size={20} cursor={'pointer'}/>
                    <MdDelete size={25} color="red" cursor={'pointer'}/>
                </div>
                  )
                }
                <div className="" onClick={handleShow}>
                    <BsThreeDotsVertical size={25} cursor={'pointer'}></BsThreeDotsVertical>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
