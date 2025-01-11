const Header = ({name}) => {
    return <h1>{name}</h1>
}
const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}
const Content = ({parts}) => {
    let returned = parts.map(((item,i) => <Part key={i} part={item}/>))
    return (
        <>
            {returned}
        </>
    )
}
const Total = ({parts}) => {
    let sum = parts.reduce((sum, item) => sum + item.exercises, 0)
    return (<p>Number of exercises {sum}</p>)
}
const Course = ({course}) => (
    <>
        <Header name={course.name} />
        <Content parts = {course.parts} />
        <Total parts={course.parts}/>
    </>
)
 export default Course