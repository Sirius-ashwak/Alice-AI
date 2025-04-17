import { useState } from 'react';
import { JobListing } from '@shared/types';
import { MapPin, Clock, ExternalLink, BookmarkPlus, Briefcase, Building, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface JobListingsProps {
  jobs: JobListing[];
  total?: number;
}

export function JobListings({ jobs, total = 0 }: JobListingsProps) {
  const [viewMore, setViewMore] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const { toast } = useToast();

  const handleViewDetails = (jobId: string) => {
    // Toggle expanded view for this job
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleSaveJob = (jobId: string, jobTitle: string) => {
    // Add job to saved jobs
    if (!savedJobs.includes(jobId)) {
      setSavedJobs([...savedJobs, jobId]);
      
      toast({
        title: "Job saved",
        description: `${jobTitle} has been saved to your profile.`,
        duration: 3000,
      });
    } else {
      // Remove from saved jobs
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      
      toast({
        title: "Job removed",
        description: `${jobTitle} has been removed from your saved jobs.`,
        duration: 3000,
      });
    }
  };

  const handleViewMoreJobs = () => {
    setViewMore(true);
    
    toast({
      title: "Loading more jobs",
      description: "Fetching additional job opportunities...",
      duration: 2000,
    });
    
    // Simulate loading more jobs
    setTimeout(() => {
      toast({
        title: "Jobs loaded",
        description: "More job opportunities are now available.",
        duration: 2000,
      });
    }, 1500);
  };

  // Function to format posted date
  const formatPostedDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Function to get work arrangement badge color
  const getWorkArrangementStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'remote':
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
      case 'hybrid':
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
      case 'on-site':
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  // Function to get job type badge color
  const getJobTypeStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";
      case 'part-time':
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300";
      case 'contract':
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-neutral-900 p-4 rounded-sm shadow-md border border-neutral-800">
      <div className="flex items-center gap-2 mb-4 text-blue-400">
        <Briefcase className="h-5 w-5" />
        <h3 className="font-bold">Top Job Opportunities</h3>
      </div>
      
      <div className="space-y-3">
        {jobs.map((job) => (
          <div 
            key={job.id}
            className="bg-neutral-800 rounded-sm p-3 border border-neutral-700 hover:bg-neutral-700 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-neutral-700 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Building className="h-5 w-5 text-neutral-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white">{job.title}</h4>
                  <p className="text-sm text-neutral-400 flex items-center gap-1">
                    {job.company}
                    {job.postedDate && (
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 ml-2">
                        • Posted {formatPostedDate(job.postedDate)}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <span className={`${getWorkArrangementStyle(job.workArrangement)} text-xs px-3 py-1 rounded-full font-medium`}>
                {job.workArrangement}
              </span>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="bg-neutral-700 text-neutral-300 px-2 py-1 rounded-sm flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.jobType}
              </span>
              <span className="bg-neutral-700 text-neutral-300 px-2 py-1 rounded-sm flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {job.location}
              </span>
              {job.salary && (
                <span className="bg-neutral-700 text-blue-300 px-2 py-1 rounded-sm">
                  {job.salary.currency}{job.salary.min.toLocaleString()} - {job.salary.currency}{job.salary.max.toLocaleString()}
                </span>
              )}
            </div>
            
            <div className="mt-3 text-sm">
              <p className={`text-neutral-300 ${expandedJobId === job.id ? '' : 'line-clamp-2'}`}>
                {job.description}
              </p>
            </div>
            
            {job.requirements && job.requirements.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(expandedJobId === job.id ? job.requirements : job.requirements.slice(0, 3)).map((req, idx) => (
                  <span key={idx} className="text-xs bg-neutral-900 text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded-sm">
                    {req}
                  </span>
                ))}
                {job.requirements.length > 3 && expandedJobId !== job.id && (
                  <span className="text-xs bg-neutral-900 text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded-sm">
                    +{job.requirements.length - 3} more
                  </span>
                )}
              </div>
            )}
            
            <div className="mt-4 flex gap-2">
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white transition rounded-sm"
                onClick={() => handleViewDetails(job.id)}
              >
                {expandedJobId === job.id ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Details
                  </>
                )}
              </Button>
              <Button 
                size="sm"
                variant="outline"
                className={`${
                  savedJobs.includes(job.id) 
                    ? "border-violet-500 text-violet-300 bg-violet-500/10" 
                    : "border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-800"
                } rounded-sm`}
                onClick={() => handleSaveJob(job.id, job.title)}
              >
                <BookmarkPlus className="h-4 w-4 mr-1" />
                {savedJobs.includes(job.id) ? "Saved" : "Save"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {jobs.length > 0 && (
        <div className="mt-4 flex justify-between items-center pt-3 border-t border-neutral-800">
          <span className="text-xs text-neutral-500">
            Showing {jobs.length} of {total || jobs.length} jobs
          </span>
          <Button 
            variant="ghost"
            size="sm"
            className="text-blue-500 hover:text-blue-400 hover:bg-neutral-800 flex items-center rounded-sm"
            onClick={handleViewMoreJobs}
          >
            View more jobs 
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
