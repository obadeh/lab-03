'use strict';

function Horns(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Horns.all.push(this);
}
Horns.all = [];

Horns.prototype.render = function() {

  // Create a new empty div tag
  let hornOutput = $('<div></div>');
      hornOutput.addClass(this.keyword);

  // clone (copy) the html from inside the photo-template
  let template = $('#photo-template').html();

  // Add the template to the output div
  hornOutput.html( template );

  // Put the data in
  hornOutput.find('h2').text( this.title );
  hornOutput.find('img').attr('src', this.image_url);
  hornOutput.find('p').text(this.description);

  $('main').append(hornOutput);

};

function populateSelectBox() {
  let seen = {};
  let select = $('select');
  Horns.all.forEach( (horn) => {
    if ( ! seen[horn.keyword] ) {
      let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
      select.append(option);
      seen[horn.keyword] = true;
    }
  });

  console.log(seen);
}

$('select').on('change', function() {
  let selected = $(this).val();
  $('div').hide();
  $(`.${selected}`).fadeIn(800);
});

$.get('../data/page-1.json')
  .then( data => {
    data.forEach( (thing) => {
      let horn = new Horns(thing);
      horn.render();
    });
  })
  .then( () => populateSelectBox() );