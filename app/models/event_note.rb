class EventNote < ActiveRecord::Base
  belongs_to :educator
  belongs_to :student
  belongs_to :event_note_type

  validates_presence_of :educator_id, :student_id, :event_note_type_id, :recorded_at
end
