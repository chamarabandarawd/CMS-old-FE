import React from 'react';
import { Link } from 'react-router-dom';


const Public = () => {
  return (
    <section className='public'>
        <header>
        <h1>Welcome to Car Mnager system</h1>
        </header>
        <main>
            <p>Rent a car for you trip, chaeapest price aget excelent service. Book today!</p>
            <p>&nbsp;</p>
            <address>
                Car Reant manager<br/>
                143/1 Alapalawala<br/>
                Kegalle<br/>
                <a href='tel:0719130861'>(555) 555-5555</a>
            </address>
        </main>
        <footer>
            <Link to='/login'>Customer Login</Link>
        </footer>

    </section>
  )
}

export default Public