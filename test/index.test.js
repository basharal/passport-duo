var duo = require('index');


describe('passport-duo', function() {
    
  it('should export version', function() {
    expect(duo.version).to.be.a('string');
  });
    
  it('should export Strategy', function() {
    expect(duo.Strategy).to.be.a('function');
  });
  
});
