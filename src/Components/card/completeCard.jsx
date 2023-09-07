import React from 'react'
import Items2 from "./completeitems"
import "./Card.css"
import { Link } from 'react-router-dom'

function Card() {
  return (
    <div className="card shadow-2xl">
        <form action="/delete" method="post"><Items2/><Items2/></form>
        </div>
  )
}
export default Card
