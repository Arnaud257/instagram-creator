// Importer les icônes depuis un CDN
const { 
  Upload, Mail, Phone, User, Lock, 
  Image, Check, Copy, Download, 
  Eye, EyeOff, AlertCircle, ExternalLink 
} = window.lucide;

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
      alert('Veuillez remplir au moins le nom d\'utilisateur, le mot de passe et l\'email/téléphone');
    }
  };

  const downloadProfilePicture = () => {
    if (formData.profilePicture) {
      const link = document.createElement('a');
      link.href = formData.profilePicture;
      link.download = `${formData.username}_profile.jpg`;
      link.click();
    }
  };

  const downloadPhoto = (photo, index) => {
    const link = document.createElement('a');
    link.href = photo;
    link.download = `${formData.username}_post_${index + 1}.jpg`;
    link.click();
  };

  const saveAccount = () => {
    const newAccount = {
      ...formData,
      createdAt: new Date().toLocaleString('fr-FR'),
      id: Date.now()
    };
    setSavedAccounts(prev => [...prev, newAccount]);
    alert('Compte sauvegardé dans l\'historique !');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      username: '',
      password: '',
      contact: '',
      contactType: 'email',
      profilePicture: null,
      photos: [],
      fullName: '',
      bio: ''
    });
  };

  const openInstagram = () => {
    window.open('https://www.instagram.com/accounts/emailsignup/', '_blank');
  };

  const Icon = ({ component: Component, ...props }) => {
    return React.createElement(Component, props);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-2xl p-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Assistant Création Instagram
          </h1>
          <p className="text-center text-gray-600 mt-2">Préparez vos informations avant de créer manuellement votre compte</p>
        </div>

        {/* Le reste du code de l'application ici... */}
        {/* Je vais continuer dans le prochain message car c'est long */}
        
      </div>
    </div>
  );
}

// Charger les icônes Lucide
const script = document.createElement('script');
script.src = 'https://unpkg.com/lucide@latest';
script.onload = () => {
  lucide.createIcons();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<InstagramAccountCreator />);
};
document.head.appendChild(script);