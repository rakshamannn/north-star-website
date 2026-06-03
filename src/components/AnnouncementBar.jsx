import './AnnouncementBar.css'

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="announcement-bar-inner">
        <p className="announcement-text">
          Stake SOL with 0% platform commission, available now.{' '}
          <a href="#" className="announcement-link">Get started</a>
        </p>
      </div>
    </div>
  )
}
