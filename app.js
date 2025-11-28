function InstagramAccountCreator() {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    contact: '',
    contactType: 'email',
    profilePicture: null,
    photos: [],
    fullName: '',
    bio: ''
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [savedAccounts, setSavedAccounts] = React.useState([]);
  const [copied, setCopied] = React.useState('');

  // Recharge les icônes après chaque rendu
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotosUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const photoPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(photoPromises).then(photos => {
      setFormData(prev => ({ ...prev, photos }));
    });
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const handlePrepareAccount = () => {
    if (formData.username && formData.password && formData.contact) {
      setStep(2);
    } else {
      alert('Veuillez remplir le nom d’utilisateur, le mot de passe et l’email/téléphone.');
    }
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/accounts/emailsignup/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Assistant Création Instagram
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Préparez toutes les informations nécessaires avant de créer votre compte Instagram.
          </p>
        </div>

        {/* Step 1 : Formulaire */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-xl shadow-xl space-y-4">

            <div>
              <label className="font-medium">Nom d'utilisateur</label>
              <input
                type="text"
                name="username"
                className="w-full p-2 border rounded-lg"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="font-medium">Mot de passe</label>
              <div className="flex items-center border rounded-lg p-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="flex-1 outline-none"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i data-lucide={showPassword ? "eye-off" : "eye"} class="w-5 h-5"></i>
                </button>
              </div>
            </div>

            <div>
              <label className="font-medium">Email ou téléphone</label>
              <input
                type="text"
                name="contact"
                className="w-full p-2 border rounded-lg"
                value={formData.contact}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700"
              onClick={handlePrepareAccount}
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 2 : Préparation */}
        {step === 2 && (
          <div className="bg-white p-6 rounded-xl shadow-xl space-y-4">

            <h2 className="text-xl font-bold mb-4">Vos informations sont prêtes 🎉</h2>

            <div className="space-y-2">
              <p><b>Nom d’utilisateur :</b> {formData.username}</p>
              <p><b>Mot de passe :</b> {formData.password}</p>
              <p><b>Contact :</b> {formData.contact}</p>
            </div>

            <button
              className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold hover:bg-pink-600"
              onClick={openInstagram}
            >
              Ouvrir Instagram pour créer le compte
            </button>

            <button
              className="w-full bg-gray-200 py-3 rounded-lg font-bold hover:bg-gray-300"
              onClick={() => setStep(1)}
            >
              Modifier les informations
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<InstagramAccountCreator />);
