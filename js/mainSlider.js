const mainSlider = {
  _images: new Array(3), //Set here count of images
  _current: 0,

  run: function() {
    let prevSlider = document.querySelector('.mainSlider-prev');
    let nextSlider = document.querySelector('.mainSlider-next');
    prevSlider.addEventListener('click', () => this.move(0));
    nextSlider.addEventListener('click', () => this.move(1));

    for (let i=0; i<this._images.length; i++) {
      this._images[i] = `mainSlider${i}.jpg`;
    }
  },

  move: function(type) {
    let slider = document.getElementById('mainSlider');
    let image = new Image();

    if (type === 0) { //Prev
      if (this._current === 0) this._current = this._images.length;
      this._current--;
    }
    else if (type === 1) { //Next
      if (this._current === this._images.length - 1) this._current = -1;
      this._current++;
    }
    else throw new Error('Invalid type of move mainSlider!')

    image.src = `./images/${this._images[this._current]}`;
    image.id = 'mainSliderImg'

    image.onload = () => {
      let oldImage = document.getElementById('mainSliderImg');
      if (oldImage) oldImage.remove();

      slider.appendChild(image)
    }
  },

}

//Add remove div function
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

mainSlider.run();
