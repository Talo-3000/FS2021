import React from 'react'

const Course = props => {

    return props.courses.map(course =>
      <Content course={course} key={course.id}/>
    );
  }
  const Header = (props) => {
    return (
      <div>
        <h2>{props.name}</h2>
      </div>
    )
  }
  
  const Content = props => {
    return (
        <div>
          <Header name={props.course.name} />
          {props.course.parts.map(part =>
            <Part name={part.name} exercises={part.exercises} key={part.id} />
          )}
          <Total course={props.course} />
        </div>
    )
  }
  const Part = ({name, exercises}) => {
    return (
      <div>
        <p>{name} {exercises}</p>
      </div>
    )
  }
  
  const Total = props => {
  
    const parts = props.course.parts
    const exorcism = parts.map(part => part.exercises)
    const totalEx = exorcism.reduce((acc, cur) => acc + cur)
    return (
      <div>
        <b>Total of {totalEx} exercises</b>
      </div>
    )
  }
export default Course