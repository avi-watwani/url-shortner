class HomepageController < ApplicationController
  def index
    @url_hash = UrlHash.find_by(short: params[:path].to_s)
    redirect_to "https://#{@url_hash.long}", allow_other_host: true if @url_hash
  end
end
