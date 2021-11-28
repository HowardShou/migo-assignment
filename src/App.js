import Header from 'components/Header'
import Inventory from 'components/Inventory'

function App() {
  return (
    <div className='App flex justify-center w-screen h-screen'>
      <div className='w-full h-full max-w-[1440px]'>
        <Header />
        <Inventory />
      </div>
    </div>
  )
}

export default App
