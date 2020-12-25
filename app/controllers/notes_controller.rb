class NotesController < ApplicationController
  before_action :authenticate_user!

  def create
    @note = Note.create(title: note_params[:title], 
                                     text: note_params[:text], 
                                     date: Date.parse(note_params[:date]),
                                     time: note_params[:time]) 
    current_user.notes << @note                                  
  
    time = Time.parse("#{note_params[:date]} #{note_params[:time]}")  
    if time > Time.now
      job_id = NotesMailer.delay_until(Time.parse("#{note_params[:date]} #{note_params[:time]}"))
                          .notice(current_user.id, @note.id)
      @note.job_id = job_id
      @note.save
    end     
             
 
    render :create
  end

  def update
    @note = Note.find(params[:id])
    @note.update(title: note_params[:title], 
                 text: note_params[:text], 
                 date: Date.parse(note_params[:date]),
                 time: note_params[:time])
    
    Sidekiq::ScheduledSet.new.find_job(@note.job_id)&.delete
    @note.job_id = nil
    @note.save
     
    time = Time.parse("#{note_params[:date]} #{note_params[:time]}")
    if time > Time.now
      NotesMailer.delay_until(Time.parse("#{@note.date} #{@note.time.strftime("%H:%M")}"))
                .notice(current_user.id, @note.id)  
    end                    
    
    render :update
  end  

  def destroy
    @note = Note.destroy(params[:id])
    Sidekiq::ScheduledSet.new.find_job(@note.job_id)&.delete
  end  

  private

  def note_params
    params.require(:note).permit(:title, :text, :date, :time)
  end
end