import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

const SimilarJobs = props => {
  const {
    companyLogoUrl,
    id,
    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = similarJobs

  console.log(similarJobData)

  return (
    <li className="similar-job-li-container">
      <div className="img-job-title-container">
        <img
          className="company-job-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-job-rating-container">
          <h1 className="title-job-heading">{title}</h1>
          <div className="star-job-rating-container">
            <AiFillStar className="star-job-icon" />
            <p className="rating-job-text">{rating}</p>
          </div>
        </div>
        <div className="second-part-job-container">
          <h1 className="description-job-heading">Description</h1>
          <p className="description-job-para">{jobDescription}</p>
        </div>
        <div className="location-job-type-container">
          <div className="location-job-icon-container">
            <MdLocationOn className="location-job-icon" />
            <p className="location-job">{location}</p>
          </div>
          <div className="employment-job-type-icon-employment-type-container">
            <p className="job-type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
