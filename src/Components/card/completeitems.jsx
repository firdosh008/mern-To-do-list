import React from "react";

function items() {
  return (
    <>
      <div class="item">
        <input
          class="w-5 h-5 rounded-full"
          type="checkbox"
          onchange="form.submit()"
          name="checkbox"
          value="<%=ni._id%>"
          checked
        />
        <p>hello</p>
        <p className="date">222/22/22</p>
      </div>
      <input type="hidden" name="listName" value="<%=kindofday%>" />
    </>
  );
}

export default items;
