import { Event } from '@shared/types';
import { Button } from '@/components/ui/button';
import { 
  Calendar, MapPin, Clock, ExternalLink, Bell, Tag, Users, CalendarClock
} from 'lucide-react';

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  // Function to format date
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Function to get event type badge style
  const getEventTypeBadgeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'workshop':
        return "bg-violet-900/40 text-violet-300 border border-violet-700/30";
      case 'webinar':
        return "bg-blue-900/40 text-blue-300 border border-blue-700/30";
      case 'conference':
        return "bg-amber-900/40 text-amber-300 border border-amber-700/30";
      case 'networking':
        return "bg-emerald-900/40 text-emerald-300 border border-emerald-700/30";
      default:
        return "bg-zinc-800 text-zinc-300 border border-zinc-700/30";
    }
  };

  return (
    <div className="bg-zinc-900 p-4 rounded-lg shadow-md border border-zinc-800">
      <div className="flex items-center gap-2 mb-4 text-violet-400">
        <Calendar className="h-5 w-5" />
        <h3 className="font-bold">Upcoming Events</h3>
      </div>
      
      <div className="space-y-4">
        {events.map((event) => (
          <div 
            key={event.id}
            className="bg-zinc-800 rounded-lg p-4 border border-zinc-700/50 hover:bg-zinc-800/80 transition-all duration-200"
          >
            <div className="flex justify-between items-start flex-wrap gap-3 md:flex-nowrap">
              <div className="flex gap-3 w-full md:w-auto">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-violet-500/30">
                  <CalendarClock className="h-6 w-6 text-violet-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-white">{event.title}</h4>
                  <div className="flex mt-2 items-center gap-3 text-sm text-zinc-400 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatEventDate(event.date)}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <span className={`${getEventTypeBadgeStyle(event.type)} text-xs px-3 py-1 rounded-full font-medium`}>
                {event.type}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-zinc-300 leading-relaxed">{event.description}</p>
              
              {event.speakers && event.speakers.length > 0 && (
                <div className="mt-4 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800/50">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
                    <Users className="h-3.5 w-3.5" />
                    <span className="font-medium">Speakers:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.speakers.map((speaker: { name: string; role?: string }, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 bg-zinc-800 rounded-md px-3 py-1.5 text-xs text-zinc-300">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-medium">
                          {speaker.name.charAt(0)}
                        </div>
                        <span className="font-medium">{speaker.name}</span>
                        {speaker.role && <span className="text-zinc-500">({speaker.role})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {event.tags && event.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-zinc-400 mr-1">
                    <Tag className="h-3.5 w-3.5" />
                    <span className="font-medium">Tags:</span>
                  </div>
                  {event.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700/50 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex gap-3 mt-5 flex-wrap">
                {(event.registrationUrl || event.registerUrl) && (
                  <Button
                    size="sm"
                    className="bg-violet-600 hover:bg-violet-700 text-white transition rounded-md"
                    asChild
                  >
                    <a 
                      href={event.registrationUrl || event.registerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1.5" />
                      Register Now
                    </a>
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 rounded-md"
                >
                  <Bell className="h-4 w-4 mr-1.5" />
                  Set Reminder
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5 p-4 border border-zinc-800 rounded-lg bg-gradient-to-br from-violet-900/10 to-indigo-900/10">
        <div className="flex gap-3 items-start">
          <Calendar className="h-5 w-5 text-violet-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-zinc-300">
            <p className="leading-relaxed">These events provide opportunities for networking, skill development, and career advancement specifically designed for women professionals.</p>
            <p className="mt-2 font-medium text-white">Would you like to filter events by type or location?</p>
          </div>
        </div>
      </div>
    </div>
  );
}