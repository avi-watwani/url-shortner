class Api::V1::UrlHashesController < ApplicationController
  before_action :set_url, only: %i[show destroy]

  def index
    url_hashes = UrlHash.all
    render json: url_hashes
  end

  def create
    url_hash = UrlHash.create!(short: "#{SecureRandom.hex[0, 6]}-#{Time.current.to_i}", long: url_params[:long].to_s)
    if url_hash
      render json: url_hash
    else
      render json: url_hash.errors
    end
  end

  def show
    render json: @url_hash
  end

  def destroy
    @url_hash&.destroy
    render json: { message: 'Short URL deleted!' }
  end

  private

  def url_params
    params.permit(:long)
  end

  def set_url
    @url_hash = UrlHash.find(params[:id])
  end
end
