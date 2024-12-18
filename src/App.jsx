import React from 'react'
import {svgs} from './svg'

const App = () => {
  
  //number group arrays
  const numG1 = ['7','8','9']
  const numG2 = ['4','5','6']
  const numG3 = ['3','2','1']

  //theme toggele
  const [theme, setTheme] = React.useState(false)

  function toggleTheme(){
    setTheme(prev => !prev)
  }

  //populate live cal section
  const [live, setLive] = React.useState([])

  function liveCal(item = '0'){
    setLive(prev => {
      if(item === ' + ' || item === ' - ' || item === ' x ' || item === ' / ' || item === ' % '|| item === '.'){
        if(prev.at(-1) === ' + ' || prev.at(-1) === ' - ' || prev.at(-1) === ' x ' || prev.at(-1) === ' / ' || prev.at(-1) === ' % ' || prev.at(-1) === '.'){
            return [...prev]
        }else{
          return [...prev, item]
        }
      }
      return [...prev, item]
    })
  }

  //create the expression from the live state
  function expression(){
    if (live.length === 0){
      return ['0']
    }
    const ex = live.map(item => {
        if(item === ' + '){
          return '+'
        }else if(item === ' - '){
          return '-'
        }else if(item === ' / '){
          return '/'
        }else if(item === ' x '){
          return '*'
        }else if(item === ' % '){
          return '*(1/100)*1'
        }else{
          return `${item}`
        }
    })
    return ex
  }

  //evaluate the expression
  function evaluate(x = ['0']){
    let result = ''
    if(
      x[x.length -1] === '+'||
      x[x.length -1] === '-'||
      x[x.length -1] === '/'||
      x[x.length -1] === '*'
    ){
      result = Number(Number(eval(x.slice(0, -1).join(''))).toFixed(4)).toString()
    }else{
      result = Number(Number(eval(x.join(''))).toFixed(4)).toString()
    }
    return result
  }

  //equal sign
  function equal(){
    setLive([evaluate(expression(live))])
  }

  //clear the screen
  function clear(){
    setLive([])
  }

  //valid decimal point
  function number_test(n){
    var result = (n - Math.floor(n)) !== 0; 
    if (result)
        return true
    else
        return false
  }


  return (
    <div className={theme ? 'dark' : 'container'}>
      <main className='main'>
        <div className='screen'>
             
             {/* the live field section where numbers are displayed as you type */}
        
              <section className='live-cal'>
                <p>{live.length === 0 ? '0' : live.join('')}</p>
              </section>
              
              {/* the total results section */}
              
              <section className='total'>
                  <h1>{live.length === 0 ? '0' : evaluate(expression(live))}</h1>
              </section>
              
              {/* the buttons section numbers and operators */}

        </div>

        <section className='buttons'>
            <div className='btn-container'>
                <button onClick={() => toggleTheme()} className='num-btn moon'>{theme ? svgs.sun : svgs.moon}</button>
                <button disabled = {live.length === 0} onClick={() => liveCal(' % ')} className='num-btn percent opp'>{svgs.percent}</button>
                <button disabled = {live.length === 0} onClick={() => liveCal(' / ')} className='num-btn divide opp'>{svgs.divide}</button>
                <button disabled = {live.length === 0} onClick={() => liveCal(' x ')} className='num-btn multiply opp'>{svgs.multiply}</button>
                {numG1.map(num => <button onClick={() => liveCal(num)} key={num} className='num-btn'>{num}</button>)}
                <button onClick={() => liveCal(' - ')} className='num-btn subtract opp'>{svgs.subtract}</button>
                {numG2.map(num => <button onClick={() => liveCal(num)} key={num} className='num-btn'>{num}</button>)}
                <button onClick={() => liveCal(' + ')} className='num-btn add opp'>{svgs.add}</button>
                {numG3.map(num => <button onClick={() => liveCal(num)} key={num} className='num-btn'>{num}</button>)}
                <button onClick={() => clear()} className='num-btn clear-all'>AC</button>
                <button onClick={() => liveCal('0')} className='num-btn'>0</button>
                <button disabled = {live.length === 0 || number_test(Number(evaluate(expression(live))))} onClick={() => liveCal('.')} className='num-btn'>.</button>
                <button onClick={() => equal()} className='num-btn equal'>{svgs.equal}</button>
            </div>
        </section>
      </main>
    </div>
  )
}

export default App