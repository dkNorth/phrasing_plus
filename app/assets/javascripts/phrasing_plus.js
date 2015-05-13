//=require phrasing_image_widget

var Phrasing = Phrasing || {};

var PhrasingPlus = PhrasingPlus || {};

Phrasing.isEditModeEnabled = function(){
  if($.cookie('editing_mode') === null){
    $.cookie('editing_mode', 'true');
  }

  return $.cookie("editing_mode") === "true" ? true : false;
};

var generatePhrasingImageWidget = function($wrapper){
  return new PhrasingImageWidget({
    fileInput : $wrapper.find('.phrasing-image-file-input')[0],
    $fileInputLabel : $wrapper.find('.phrasing-image-edit-label'),
    $discardChangeLabel : $wrapper.find('.phrasing-image-discard-change-label'),
    $wrapper : $wrapper,
    $image : $wrapper.find('img.phrasable-image'),
    $form : $wrapper.find('.phrasing-image-edit-form'),
    $submitButton : $wrapper.find('.phrasing-image-submit-button')
  });
};

var fetchPhrasingImageWidget = function($wrapper){
  var widget = $wrapper.data('widget');

  if(widget === undefined){
    widget = generatePhrasingImageWidget($wrapper);
    $wrapper.data('widget', widget);
  }

  return widget;
};

$(document).ready(function(){
  if(Phrasing.isEditModeEnabled()){
    $('.phrasable-image-wrapper, .phrasable-background-image').addClass('phrasable-on');
  }

  $('.phrasing-image-file-input').change(function(){
    var phrasingImageWidget = fetchPhrasingImageWidget($(this).closest('.phrasable-image-wrapper, .phrasable-background-image'));
    phrasingImageWidget.showChosenImage();
  });

  $('.phrasing-image-discard-change-label').on('click', function(){
    var phrasingImageWidget = fetchPhrasingImageWidget($(this).closest('.phrasable-image-wrapper, .phrasable-background-image'));
    phrasingImageWidget.discardChosenImage();
  });

  $(".phrasing-image-edit-form").submit(function(e) {
    var phrasingImageWidget = fetchPhrasingImageWidget($(this).closest('.phrasable-image-wrapper, .phrasable-background-image'));
    phrasingImageWidget.uploadChosenImage();
    e.preventDefault();
  });

});
