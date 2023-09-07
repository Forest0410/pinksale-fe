const Three = (props) => {
    const [validated, setValidated] = useState(false);
    const [info3, setInfo3] = useState({});
    const [error, setError] = useState("");
    const [imageValidate, setImagevalidate] = useState("");
    const [websiteValidate, setwebsiteValidate] = useState("");
    useEffect(() => {
      if (info3.logoLink && info3.website) setValidated(true);
      else setValidated(false);
    }, [info3]);
    const onInputChanged = (event) => {
      const targetName = event.target.name;
      const targetValue = event.target.value;
      if (targetName == "logoLink") {
        if (targetValue.length == 0) setImagevalidate("Logo cannot be blank");
      } else if (targetName == "website") {
        if (targetValue.length == 0)
          setwebsiteValidate("Website cannot be blank");
      }
      setInfo3((info3) => ({
        ...info3,
        [targetName]: targetValue,
      }));
    };
  
    const validate2 = () => {
      setError("");
      props.nextStep();
      props.tokenCallback(info3);
    };
  
    return (
      <div>
        <span style={{ color: "green" }}>{error}</span>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Logo URL <span style={{ color: "red" }}>*</span>
              </Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FaRegImage />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://..."
                  name="logoLink"
                  value={info3.logoLink}
                  onChange={onInputChanged}
                  aria-label="https://..."
                  aria-describedby="basic-addon1"
                />
              </div>
              <FormText className="validate-msg">{imageValidate}</FormText>
              <FormText color="muted">
                Url must end with supported image extension png, jpeg or you can
                upload your image at https://upload.pinksale.com/
              </FormText>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Website <span style={{ color: "red" }}>*</span>
              </Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <TiWorld />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://..."
                  name="website"
                  value={info3.website || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
              <FormText className="validate-msg">{websiteValidate}</FormText>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Facebook
              </Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <TiSocialFacebookCircular />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://facebook.com/..."
                  name="facebook"
                  value={info3.facebook || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>Twitter</Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FiTwitter />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://twitter.com/..."
                  name="twitter"
                  value={info3.twitter || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>Github</Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FiGithub />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://github.com/..."
                  name="github"
                  value={info3.github || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Telegram
              </Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FaTelegramPlane />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://t.me/..."
                  name="telegram"
                  value={info3.telegram || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Instagram
              </Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FaInstagram />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://instagram.com/..."
                  name="instagram"
                  value={info3.instagram || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>Discord</Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FaDiscord />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://discord.gg/..."
                  name="discord"
                  value={info3.discord || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>Reddit</Label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <FaReddit />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="https://reddit.com/..."
                  name="reddit"
                  value={info3.reddit || ""}
                  onChange={onInputChanged}
                  aria-describedby="basic-addon1"
                />
              </div>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label style={{ fontWeight: 600, marginBottom: 15 }}>
                Description
              </Label>
              <textarea
                className="form-control"
                aria-label="With textarea"
                name="description"
                value={info3.description}
                onChange={onInputChanged}
              ></textarea>
            </FormGroup>
          </Col>
        </Row>
        <br />
        {validated ? (
          <ActionButtons {...props} nextStep={validate2} />
        ) : (
          <Col style={{ textAlign: "center" }}>
            <Button disabled>Next</Button>
          </Col>
        )}
      </div>
    );
  };