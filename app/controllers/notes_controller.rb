class NotesController < ApplicationController
  before_action :authenticate_user!

  def create
    @note = Note.create(title: note_params[:title], 
                                     text: note_params[:text], 
                                     date: Date.parse(note_params[:date]),
                                     time: note_params[:time]) 
    current_user.notes << @note

    NotesMailer.delay_until(Time.parse("#{note_params[:date]} #{note_params[:time]}"))
               .notice(current_user.id, @note.id)
    render :create
  end

  def destroy
    @note = Note.destroy(note_params[:id])
  end  

  private

  def note_params
    params.permit(:id, :title, :text, :date, :time)
  end
end