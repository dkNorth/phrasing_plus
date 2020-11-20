require 'phrasing'
require 'carrierwave'
require "phrasing_plus/engine"

module PhrasingPlus
  attr_accessor :storage
  @storage = :file

  def self.configure
    yield self
  end
end
