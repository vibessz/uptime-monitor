import { useState } from 'react'
import { useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {

  const [websites, setWebsites] = useState([])


  useEffect(() => {
  fetch('http://localhost:3000/api/websites')
    .then(response => response.json())
    .then(data => setWebsites(data));
}, []);

  return (
    <div className='App'>
      <aside className='sideBar'>

      </aside>
      <main className='dashboard'>
        <h1>Dashboard</h1>
        <section className='overview'>
            {createWebTracker(websites)}


        </section>
        


      </main>
    </div>
  )
}

function createWebTracker(array){
  const websites = array.map(website => {
  let content;
  if (website.HTTPstatus != null){
    content = `${website.id} ${website.url} ${website.HTTPstatus} ${website.responseTime}`
    
  }
      
        
  
  return(<section key={website.id}>
    {content}
    </section>
  )
  })

  return(
    <ul>
      {websites}
    </ul>
  )
}



export default App
