class CalendarController < ApplicationController
  before_action :authenticate_user!

  def show
    @year = Date.today.strftime("%Y")
    @month = Date.today.strftime("%m").to_i - 1
  end  

  def load_notes
    year = calendar_params[:year]
    month = calendar_params[:month]

    format_month = (month.to_i + 1).to_s
    format_month = "0#{format_month}" if month.size == 1
   
    @notes = current_user.notes.where("to_char(date,'YYYY-MM') = ?", "#{year}-#{format_month}")

    render 'load_notes', locals: {month: month, year: year} 
  end

  private

  def calendar_params
    params.permit(:year, :month)
  end
end