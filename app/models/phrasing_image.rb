class PhrasingImage < ActiveRecord::Base
  mount_uploader :image, PhrasingImageUploader
end
