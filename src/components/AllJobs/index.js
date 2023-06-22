import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureViewImg =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png'

class AllJobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    activeCheckBoxList: [],
    activeSalaryRangeId: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    apiJobsStatus: apiJobsStatusConstants.initial,
  }

  componentDidMount = () => {
    this.onGetProfileData()
    this.onGetJobsData()
  }

  onGetProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const option = {
        method: 'GET',
         header:{
        Authorization: `Bearer ${jwtToken}`,
      },
      
    }  

    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const profile = await response.json()
      const updatedProfileData = {
        name: profile.name,
        profileImageUrl: .profile.profile_image_url,
        shortBio: profile.short_bio,
      }))
      console.log(updatedDataProfile)
      this.setState({
        profileData: updatedDataProfile,
        responseSuccess: true,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetJobData = async () => {
    this.setState({apiJobsStatus: apiJobsStatusConstants.inProgress})
    const {activeCheckBoxList, activeSalaryRangeId, searchInput} = this.state
    const type = activeCheckBoxList.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (responseJobs.ok === true) {
      const filteredJobsList = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        ratting: eachItem.ratting,
        title: eachItem.title,
      }))
      console.log(filteredJobsList)

      this.setState({
        jobsData: filteredJobsList,
        apiJobsStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiJobsStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.onGetJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onGetJobDetails()
    }
  }

  onSelectSalaryRange = event => {
      this.setState({activeSalaryRangeId: event.target.id}, this.getJobsData)
  }

  onClickCheckBox = event => {
    const {activeCheckBoxList} = this.state

    if (activeCheckBoxList.includes(event.target.id)) {
        const updatedList = activeCheckBoxList.filter(
            each => each !== event.target.id,
        )
      this.setState(
        prevState => ({
          activeCheckBoxList: [...prevState.activeCheckBoxList, event.target.id],
        }),
        this.onGetJobData,
      )
    }
 } 

  onSuccessProfileView = () => {
    const {profileData} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData
      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-icon" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      )
    }
    
   onSuccessJobView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length > 0
    return noJobs ? (
      <div className="no-jobs-container">
        <img
          className="no-job-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul className="ul-job-item-container">
        {jobsData.map(eachItem => (
          <JobItem key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    )
  }

  onRetryProfile = () => {
    this.onGetProfileData()
  }

   onRetryJobs = () => {
    this.onGetJobsDetails()
  }

  onFailureProfileView = () => (
    <div className="failure-button-container">
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryProfile}
      >
        retry
      </button>
    </div>
  )

   onFailureJobsView = () => (
       <>
    <div className="failure-img-button-container">
      <img className="failure-img" src={failureViewImg} alt="failure view" />
      <h1 className="failure-heading ">Oops! Something Went Wrong</h1>
      <p className="failure-para ">
        we cannot seem to find the page you are looking for.
      </p>
      <div className="jobs-failure-btn-container">
        <button
          className="failure-button-container"
          type="button"
          onClick={this.onRetryJobs}
        >
          retry
        </button>
      </div>
    </div>
    </>
  )


  onLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onGetCheckBoxesView = () => (
    <ul className="check-boxes-container">
      {employmentTypesList.map(eachItem => (
        <li className="li-container" key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetInputOption}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonsView = () => (
    <ul className="radio-button-container">
      {salaryRangesList.map(eachItem => (
        <li className="li-container" key={eachItem.salaryRangesId}>
          <input
            className="input"
            id={eachItem.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.onSelectSalaryRange}
          />
          <label className="label" htmlFor={eachItem.salaryRangesId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onRenderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.onLoading()
      case apiStatusConstants.failure:
        return this.onFailureProfileView()
      case apiStatusConstants.success:
        return this.onSuccessProfileView()
      default:
        return null
    }
  }
 
  onRenderJobs = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiStatusConstants.inProgress:
        return this.onLoading()
      case apiStatusConstants.failure:
        return this.onFailureJobsView()
      case apiStatusConstants.success:
        return this.onSuccessJobView()
      default:
        return null
    }
  }

  onRenderJobs = () => {
      const {searchInput} = this.state
      return (
          <>
           <div>
              <input
                className="search-input"
                type="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.onGetSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                className="search-button"
                data-testid="searchButton"
                type="button"
                onClick={this.onSubmitSearchInput}
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
          </>
      )
  }
  

  render() {
    const {checkboxInputs, radioInput, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-job-container">
          <div className="side-bar-container">
            {this.onRenderProfile()}
            <hr className="hr-line" />
            <h1 className="text">Type of Employment</h1>
            {this.onGetCheckBoxesView()}
            <hr className="hr-line" />
            <h1 className="text">Salary Range</h1>
            {this.onGetRadioButtonsView()}
          </div>
          <div className="jobs-container">
           
            {this.onRenderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default AllJobs
