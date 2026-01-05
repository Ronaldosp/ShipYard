import "../styling/Location.scss";


function Location() {
  return (
    <section className="location-component" id="location">
      <div className="location-container">
        
        {/* LEFT — MAP */}
        <div className="location-map">
          <iframe
            title="Marine Tech Location"
            src="https://www.google.com/maps?q=Batam%20Indonesia&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* RIGHT — INFO */}
        <div className="location-content">
          <h2>Our Location</h2>
          <p className="location-address">
            📍 Batam Island, Riau Islands, Indonesia
          </p>

          <p className="location-description">
            Marine Tech is strategically located in Batam, providing fast and
            reliable access to marine spare parts, technical services, and
            shipyard support for domestic and international clients.
          </p>

          <p className="location-description">
            Our location allows efficient logistics and quick response times
            for vessels docking in nearby ports.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Location;
