function input(props)
{
return <input
className="input"
label={props.label}
name={props.name}

type= {props.type}  placeholder={props.placeholder} 
onChange={props.onChange}

/>
}
 export default input