import { MentorshipProgram } from '@shared/types';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, Calendar, Clock, ExternalLink, Bell, ArrowRight, Star, Medal 
} from 'lucide-react';

interface MentorshipProgramsProps {
  mentorships: MentorshipProgram[];
}

export function MentorshipPrograms({ mentorships }: MentorshipProgramsProps) {
  // Function to get status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Applications Open':
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
      case 'Coming Soon':
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
      case 'Closed':
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400";
      default:
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400";
    }
  };

  return (
    <div className="bg-neutral-900 p-4 rounded-sm shadow-md border border-neutral-800">
      <div className="flex items-center gap-2 mb-4 text-blue-400">
        <Lightbulb className="h-5 w-5" />
        <h3 className="font-bold">Mentorship Programs</h3>
      </div>
      
      <div className="space-y-3">
        {mentorships.map((program) => (
          <div 
            key={program.id}
            className="bg-neutral-800 rounded-sm p-3 border border-neutral-700 hover:bg-neutral-700 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-neutral-700 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Medal className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white">{program.title}</h4>
                  <div className="flex mt-1 items-center gap-3 text-sm text-neutral-400 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>Starts: {program.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Duration: {program.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="bg-neutral-700 text-neutral-300 text-xs px-2 py-1 rounded-sm flex-shrink-0">
                {program.status}
              </span>
            </div>
            
            <div className="mt-3">
              <p className="text-sm text-neutral-300">{program.description}</p>
              
              <div className="flex gap-3 mt-4 flex-wrap">
                {program.learnMoreUrl && (
                  <Button
                    size="sm"
                    variant={program.status === 'Applications Open' ? 'default' : 'outline'}
                    className={
                      program.status === 'Applications Open' 
                        ? "bg-blue-600 hover:bg-blue-700 text-white transition rounded-sm"
                        : "border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800 rounded-sm"
                    }
                    asChild
                  >
                    <a 
                      href={program.learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Learn More
                    </a>
                  </Button>
                )}
                
                {program.applyUrl && program.status === 'Applications Open' ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800 rounded-sm"
                    asChild
                  >
                    <a 
                      href={program.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Apply Now
                    </a>
                  </Button>
                ) : program.status === 'Coming Soon' ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800 rounded-sm"
                  >
                    <Bell className="h-4 w-4 mr-1" />
                    Get Notified
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 border border-neutral-700 rounded-sm bg-neutral-900">
        <div className="flex gap-2 items-start">
          <Star className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-neutral-300">
            <p>These programs offer personalized guidance, networking opportunities, and skill development specifically tailored for women in technology fields.</p>
            <p className="mt-2 font-medium text-white">Is there a specific area of mentorship you're interested in?</p>
          </div>
        </div>
      </div>
    </div>
  );
}
