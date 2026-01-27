import React, { useState, useEffect } from 'react';
import { Share2, Mail, Trophy, TrendingUp, Users, DollarSign } from 'lucide-react';

const PMSimulation = () => {
  const [email, setEmail] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  // Check if user has already attempted
  useEffect(() => {
    const attempted = localStorage.getItem('pm_simulation_attempted');
    if (attempted) {
      setHasAttempted(true);
    }
  }, []);

  const simulation = {
    title: "Spotify's Freemium Conversion Challenge",
    company: "Spotify",
    description: "You're the PM leading the conversion optimization team. Premium subscribers have plateaued. Make critical decisions to boost conversion.",
    questions: [
      {
        id: 1,
        scenario: "Data shows that 68% of free users abandon the app after hitting the 6-skip limit on mobile. Your team proposes three solutions:",
        question: "What's your decision?",
        options: [
          {
            text: "Remove skip limit entirely to improve retention, bet on increased engagement leading to eventual conversion",
            points: 15,
            feedback: "Risky move. While retention might improve, you've removed a key pain point that drives premium conversion. Netflix tried unlimited features and saw conversion drop 23%."
          },
          {
            text: "Keep limit but offer 'earn extra skips by watching ads' feature",
            points: 35,
            feedback: "Strong product thinking! This creates a middle ground, generates ad revenue, and maintains conversion pressure. Similar to LinkedIn's InMail credits model."
          },
          {
            text: "Reduce limit to 3 skips but add prominent 'Unlimited Skips' upgrade CTA",
            points: 25,
            feedback: "Aggressive approach. Might boost short-term conversions but risks alienating free users. Dropbox saw 15% user churn with similar restrictions."
          },
          {
            text: "A/B test: Personalized skip limits based on user listening patterns",
            points: 40,
            feedback: "Excellent PM decision! Data-driven, user-centric, and reduces risk. This mirrors Amazon Prime's personalized trial approach that lifted conversions 31%."
          }
        ]
      },
      {
        id: 2,
        scenario: "Your analytics reveal that users who create 3+ playlists convert at 4.2x the rate of others. But only 12% of free users create playlists.",
        question: "How do you drive playlist creation?",
        options: [
          {
            text: "Gamify it: 'Create 3 playlists, unlock 1 week Premium trial'",
            points: 30,
            feedback: "Good engagement tactic. Duolingo uses similar mechanics successfully. Risk: Artificial behavior that doesn't stick post-trial."
          },
          {
            text: "Build AI-assisted playlist creator that analyzes listening history and suggests personalized playlists",
            points: 40,
            feedback: "Product excellence! Reduces friction and adds value. Similar to how Canva's template suggestions drove 40% more user creations."
          },
          {
            text: "Make playlist creation mandatory before accessing certain features",
            points: 10,
            feedback: "Poor UX decision. Forced actions create resentment. LinkedIn saw backlash when forcing profile completion for job applications."
          },
          {
            text: "Launch collaborative playlist feature with social sharing to Instagram/Twitter",
            points: 35,
            feedback: "Smart viral loop thinking! Adds social value and drives organic growth. Similar to Spotify Wrapped's success. May not directly impact conversion though."
          }
        ]
      },
      {
        id: 3,
        scenario: "Your team can only ship ONE feature this quarter. Which has the highest conversion impact?",
        question: "What do you prioritize?",
        options: [
          {
            text: "Offline listening for Premium (currently only on Premium family plan)",
            points: 35,
            feedback: "Solid feature differentiation. YouTube Premium saw 28% conversion lift when they emphasized offline viewing. But Spotify already has some offline - incremental gain."
          },
          {
            text: "High-quality audio streaming (320kbps vs current 160kbps for free)",
            points: 30,
            feedback: "Appeals to audiophiles but limited market. Tidal tried this positioning and captured only 1% market share. Niche value proposition."
          },
          {
            text: "Smart 'Continue Listening' that works across all devices with one-tap sync",
            points: 40,
            feedback: "Brilliant! Addresses a real pain point and showcases premium's ecosystem value. Apple's Continuity features drove significant ecosystem lock-in and upsells."
          },
          {
            text: "Ad-free podcasts (currently ads exist even for Premium)",
            points: 25,
            feedback: "Timely given podcast growth, but complex due to creator economics. Spotify's revenue model depends on podcast ads. Could alienate creators."
          }
        ]
      },
      {
        id: 4,
        scenario: "Your pricing team wants to test a price increase from $9.99 to $10.99/month. Finance projects $120M additional annual revenue. You have final veto.",
        question: "What's your call?",
        options: [
          {
            text: "Approve immediately - it's only $1, users won't notice",
            points: 10,
            feedback: "Dangerous assumption. Netflix lost 200K subscribers after $1 increase. Never underestimate price sensitivity, especially in competitive markets."
          },
          {
            text: "Reject - focus on growing subscriber base first, not squeezing existing users",
            points: 25,
            feedback: "Conservative approach. Valid concern, but might leave money on table if users are willing to pay. Amazon Prime increased 30% without significant churn."
          },
          {
            text: "Approve BUT grandfather existing users at $9.99 for 12 months",
            points: 40,
            feedback: "Excellent balance! Protects current relationship while capturing higher value from new users. Adobe's Creative Cloud used this successfully during transition."
          },
          {
            text: "Counter-propose: Keep $9.99 but introduce $14.99 'Premium Plus' tier with offline podcasts + audiobooks",
            points: 45,
            feedback: "Strategic genius! Decoy pricing anchors the $9.99 tier as good value while capturing willingness-to-pay from high-value users. Classic Apple playbook."
          }
        ]
      }
    ]
  };

  // Google Apps Script Web App URL for email collection
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6E8UJUn5xhilm2pLWjdvaip_6MnSCf-XRVPv5u4hOttjr0SNCu9I10q2ESLKGQ04_mQ/exec';

  const sendToGoogleSheets = async (data) => {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log('Email logging error:', error);
      // Don't block the user experience if logging fails
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Send email to Google Sheets when they start
      sendToGoogleSheets({ email, status: 'started' });
      setHasStarted(true);
    }
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, { question: currentQuestion, points: option.points, feedback: option.feedback }];
    setAnswers(newAnswers);

    if (currentQuestion < simulation.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      const totalPoints = newAnswers.reduce((sum, answer) => sum + answer.points, 0);
      const maxPoints = simulation.questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.points)), 0);
      const percentage = Math.round((totalPoints / maxPoints) * 100);
      
      let tier = '';
      if (percentage >= 90) tier = 'Elite PM';
      else if (percentage >= 75) tier = 'Senior PM';
      else if (percentage >= 60) tier = 'Mid-Level PM';
      else tier = 'Associate PM';
      
      // Send final results to Google Sheets
      sendToGoogleSheets({ 
        email, 
        score: totalPoints,
        percentage,
        tier
      });
      
      setShowResults(true);
      localStorage.setItem('pm_simulation_attempted', 'true');
    }
  };

  const calculateScore = () => {
    const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0);
    const maxPoints = simulation.questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.points)), 0);
    return { totalPoints, maxPoints, percentage: Math.round((totalPoints / maxPoints) * 100) };
  };

  const getNarrative = (percentage) => {
    if (percentage >= 90) {
      return {
        title: "Product Leadership Excellence",
        text: "You demonstrated exceptional product judgment, balancing user value, business metrics, and strategic thinking. Your decisions reflect deep understanding of freemium dynamics, competitive positioning, and data-driven decision making. You're ready for VP/CPO roles at top product companies.",
        tier: "Elite PM"
      };
    } else if (percentage >= 75) {
      return {
        title: "Senior PM Caliber",
        text: "Strong product instincts with solid grasp of conversion mechanics and user psychology. You made several strategic choices that show maturity in balancing short-term metrics with long-term value creation. A few decisions leaned too aggressive or conservative - calibrate your risk tolerance.",
        tier: "Senior PM"
      };
    } else if (percentage >= 60) {
      return {
        title: "Mid-Level PM Thinking",
        text: "You show good foundational product skills but missed opportunities to leverage data and think systemically. Some choices optimized for one metric at the expense of holistic product health. Focus on developing frameworks for complex tradeoffs and multi-stakeholder decision-making.",
        tier: "Mid-Level PM"
      };
    } else {
      return {
        title: "Developing PM Skills",
        text: "Your decisions suggest you're still building intuition for product strategy at scale. Several choices prioritized features over user value or missed competitive dynamics. Study case studies from Spotify, Netflix, and other consumer subscription businesses to build pattern recognition.",
        tier: "Associate PM"
      };
    }
  };

  const shareToLinkedIn = () => {
    const score = calculateScore();
    const narrative = getNarrative(score.percentage);
    const text = `I just scored ${score.percentage}% on the "${simulation.title}" PM Simulation! 🎯\n\nResult: ${narrative.tier}\n\nThink you can beat my score? Test your product leadership skills:\n\n#ProductManagement #ProductStrategy #Leadership`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  if (hasAttempted && !hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Already Completed!</h2>
          <p className="text-gray-600 mb-6">You've already taken this simulation. Each executive gets one attempt to ensure fair competition and thoughtful decision-making.</p>
          <p className="text-sm text-gray-500">Want more simulations? Connect with me on LinkedIn for upcoming challenges!</p>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{simulation.title}</h1>
                <p className="text-blue-100">Executive PM Simulation • {simulation.company}</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <p className="text-lg text-gray-700 mb-6">{simulation.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Questions</div>
                <div className="text-xl font-bold text-gray-900">{simulation.questions.length}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Trophy className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">One Attempt</div>
                <div className="text-xl font-bold text-gray-900">Only</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Share2 className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-sm text-gray-600">Shareable</div>
                <div className="text-xl font-bold text-gray-900">Results</div>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Executive Email (Required for Results & Future Simulations)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Start Simulation →
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                Your email is used only for results delivery and future PM simulation notifications. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const narrative = getNarrative(score.percentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Shareable Score Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">{narrative.tier}</h2>
              <div className="text-5xl font-bold mb-2">{score.percentage}%</div>
              <div className="text-blue-100">Score: {score.totalPoints} / {score.maxPoints} points</div>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{narrative.title}</h3>
              <p className="text-gray-700 mb-6">{narrative.text}</p>
              
              <button
                onClick={shareToLinkedIn}
                className="w-full bg-[#0A66C2] text-white py-3 rounded-lg font-semibold hover:bg-[#004182] transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share on LinkedIn & Challenge Your Network
              </button>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Decision Analysis</h3>
            
            {simulation.questions.map((q, idx) => (
              <div key={q.id} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Points Earned</span>
                        <span className="text-lg font-bold text-indigo-600">{answers[idx].points}/{Math.max(...q.options.map(o => o.points))}</span>
                      </div>
                      <p className="text-sm text-gray-600">{answers[idx].feedback}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">
              Want more PM simulations? Follow me on LinkedIn for weekly challenges!
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Mohan. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = simulation.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {simulation.questions.length}</span>
            <span>{Math.round(((currentQuestion) / simulation.questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-600 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion) / simulation.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{currentQuestion + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Scenario</h3>
                <p className="text-gray-700 leading-relaxed">{currentQ.scenario}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-4">{currentQ.question}</h4>
            
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-indigo-500">
                      <div className="w-3 h-3 bg-transparent group-hover:bg-indigo-500 rounded-full transition-all" />
                    </div>
                    <p className="text-gray-700 group-hover:text-gray-900 leading-relaxed">{option.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          💡 Choose carefully - you only get one attempt at this simulation
        </div>
      </div>
    </div>
  );
};

export default PMSimulation;