import React from 'react'

function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="footer mx-auto text-center sticky mt-10">
        <p>copyright &copy; {currentYear}</p>
      </div>
    </footer>
  )
}

export default Footer
