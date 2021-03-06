class NotesMailer < ApplicationMailer

  def notice(user_id, note_id)
    @user = User.find(user_id)
     @note = Note.find(note_id)

    if(@user.present? && @note.present?)
      mail(to: @user.email, subject: 'Напоминание')
    end  
  end

end