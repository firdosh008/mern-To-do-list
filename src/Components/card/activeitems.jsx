import React,{useContext} from "react";
import {FiEdit} from "react-icons/fi"



function Items(props) {
  return (
    <>
        <div class="item">
        <input
          class="w-5 h-5 rounded-full"
          type="checkbox"
          onchange="form.submit()"
          name="checkbox"
          value="<%=ni._id%>"
        />
        <p>hello</p>
        <p className="date">222/22/22</p>
        <FiEdit className="icon "/>
      </div>
      {/* <input type="hidden" name="listName" value="<%=kindofday%>" /> */}
    </>
  );
}

export default Items;
