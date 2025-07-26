const Testimonials = () => {
  const testimonials = [
    { initial: 'M', name: 'Michael Thompson', text: '"Gradient Cam Studio has transformed how I create tutorial videos..."', rating: 5 },
    { initial: 'S', name: 'Sarah Johnson', text: '"As a teacher, I use this daily for my online classes..."', rating: 4.5 },
    { initial: 'D', name: 'David Williams', text: '"The gradient visuals make my videos look professional..."', rating: 5 },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <h2 className="section-title">What Users Say</h2>
      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <div className="testimonial-header">
              <div className="avatar">{testimonial.initial}</div>
              <h3>{testimonial.name}</h3>
            </div>
            <p>{testimonial.text}</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={
                    i < Math.floor(testimonial.rating) 
                      ? "fas fa-star" 
                      : i < testimonial.rating 
                        ? "fas fa-star-half-alt" 
                        : "far fa-star"
                  }
                ></i>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;